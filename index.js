const path = require('path');
const yargs = require('yargs/yargs');
const { execSync } = require('child_process');
const { hideBin } = require('yargs/helpers');

const { checkoutBranch, protectedBranches } = yargs(hideBin(process.argv))
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
  .parse();

let stepNumber = 1;
const numberOfSteps = 5;
const rootDirectory = path.join(__dirname, '../../');
const options = { cwd: rootDirectory };

const display = (content, indent = 0) => console.log(`${indent ? '  '.repeat(indent) : '\n'}${content}`);
const displayProgress = content => display(`[${stepNumber++}/${numberOfSteps}] ${content}`);
const displayInfo = content => display(`- ${content}`, 1);

const startLog = () => {
  display('Deleting untracked Git branches:');
  displayInfo(`Checkout Branch: ${checkoutBranch ?? 'None'}`);
  displayInfo(`Protected Branches: ${protectedBranches ?? 'None'}`);
};

const updateGitRemoteTracking = () => {
  displayProgress('Updating Git remote tracking');
  execSync('git remote update origin --prune', options);
};

const checkoutNewBranch = () => {
  if (!checkoutBranch) {
    return displayProgress('No checkout branch, staying on current branch');
  }

  const currentBranches = execSync('git branch', options).toString().split('\n');
  const currentBranch = currentBranches.find(branch => branch.includes('*')).split('* ')[1];
  if (checkoutBranch === currentBranch) {
    return displayProgress(`Already on branch ${checkoutBranch}`);
  }

  displayProgress(`Checking out ${checkoutBranch}`);
  execSync(`git checkout ${checkoutBranch}`, options);
};

const updateNewBranch = () => {
  const branchName = execSync('git branch --show-current', options).toString().replace('\n', '');
  displayProgress(`Updating branch ${branchName} from origin`);
  execSync(`git pull origin ${branchName}`, options);
};

const deleteUntrackedGitBranches = () => {
  displayProgress('Finding untracked branches');
  const branches = execSync('git branch -vv', options).toString().split('\n');
  const untrackedBranches = branches
    .filter(branch => branch.includes(': gone]'))
    .map(branch => branch.trim().split(' ')[0])
    .filter(branch => branch !== checkoutBranch && !protectedBranches?.includes(branch));

  if (!untrackedBranches?.length) {
    return displayProgress('No untracked branches to delete');
  }

  displayProgress('Deleting untracked branches:');
  untrackedBranches.forEach(branch => {
    displayInfo(branch);
    execSync(`git branch -D ${branch}`, options);
  });
};

const endLog = () => display('Done');

startLog();

updateGitRemoteTracking();

checkoutNewBranch();

updateNewBranch();

deleteUntrackedGitBranches();

endLog();
