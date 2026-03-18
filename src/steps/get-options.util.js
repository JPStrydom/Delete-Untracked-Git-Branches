import { execSync } from 'node:child_process';
import inquirer from 'inquirer';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { createDisplayFunctions } from './utils/index.js';

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

  const displayFunctions = createDisplayFunctions({ totalSteps: 4 });

  const execOptions = { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf-8' };
  const executeCommand = (command, errorMessage) => {
    try {
      return execSync(command, execOptions);
    } catch (error) {
      displayFunctions.displayInfo(errorMessage);
      displayFunctions.displayInfo(error.message);
      process.exit(1);
    }
  };

  return {
    checkoutBranch,
    protectedBranches,
    dryRun,
    executeCommand,
    ...displayFunctions
  };
};
