import inquirer from 'inquirer';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { execSync } from 'node:child_process';

const argv = yargs(hideBin(process.argv))
  .scriptName('Delete Untracked Git Branches')
  .usage('delete-untracked-git-branches -- -c dev -p dev,master')
  .option('c', {
    alias: 'checkout-branch',
    describe: 'A branch to checkout before performing the branch deletes.',
    type: 'string',
    nargs: 1
  })
  .option('p', {
    alias: 'protected-branches',
    describe: 'Branches to exclude from the branch deletes. These should be comma-separated.',
    type: 'string',
    nargs: 1
  })
  .option('d', {
    alias: 'dry-run',
    describe: 'List untracked branches without deleting them.',
    type: 'boolean',
    default: false
  })
  .parseSync();

let stepNumber = 1;
const numberOfSteps = 5;
const execOptions = { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf-8' };

const display = (content, indent = 0) => console.log(`${indent ? '  '.repeat(indent) : '\n'}${content}`);
const displayProgress = content => display(`[${stepNumber++}/${numberOfSteps}] ${content}`);
const displayInfo = content => display(`- ${content}`, 1);

const executeCommand = (command, errorMessage) => {
  try {
    return execSync(command, execOptions);
  } catch (error) {
    displayInfo(errorMessage);
    displayInfo(error.message);
    process.exit(1);
  }
};

const questions = [
  {
    type: 'input',
    name: 'checkoutBranch',
    message:
      'Which branch would you like to check out before deleting untracked branches? (Leave empty for no checkout)',
    default: argv.checkoutBranch || '',
    when: argv.checkoutBranch === undefined
  },
  {
    type: 'input',
    name: 'protectedBranches',
    message: 'Which branches should be protected from deletion? (Comma-separated, e.g. "dev,master")',
    default: argv.protectedBranches || 'main,master,dev,develop',
    when: argv.protectedBranches === undefined
  },
  {
    type: 'confirm',
    name: 'dryRun',
    message: 'Would you like to perform a dry run? (List branches without deleting them)',
    default: argv.dryRun || false,
    when: argv.dryRun === undefined
  }
];

export const getOptions = async () => {
  const answers = await inquirer.prompt(questions);

  const checkoutBranch = answers.checkoutBranch || argv.checkoutBranch;
  const protectedBranches = answers.protectedBranches || argv.protectedBranches;
  const dryRun = answers.dryRun ?? argv.dryRun;

  return {
    checkoutBranch,
    protectedBranches,
    dryRun,
    display,
    displayProgress,
    displayInfo,
    executeCommand
  };
};
