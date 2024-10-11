const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');

const { checkoutBranch, protectedBranches, dryRun } = yargs(hideBin(process.argv))
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
  .parse();

let stepNumber = 1;
const numberOfSteps = 5;
const execOptions = { cwd: __dirname, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf-8' };

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

const getOptions = () => ({
  checkoutBranch,
  protectedBranches,
  dryRun,
  display,
  displayProgress,
  displayInfo,
  executeCommand
});

module.exports = { getOptions };
