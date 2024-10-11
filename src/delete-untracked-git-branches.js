const { getUntrackedBranches } = require('./utils');

const deleteUntrackedGitBranches = ({
  checkoutBranch,
  protectedBranches,
  dryRun,
  displayProgress,
  displayInfo,
  executeCommand
}) => {
  displayProgress('Finding untracked branches');
  const untrackedBranches = getUntrackedBranches({
    checkoutBranch,
    protectedBranches,
    executeCommand
  });

  if (!untrackedBranches?.length) {
    return displayProgress('No untracked branches to delete');
  }

  if (dryRun) {
    displayProgress('Listing untracked branches:');
    return untrackedBranches.forEach(branch => {
      displayInfo(branch);
    });
  }

  displayProgress('Deleting untracked branches:');
  untrackedBranches.forEach(branch => {
    displayInfo(branch);
    executeCommand(`git branch -D ${branch}`, `Failed to delete branch ${branch}`);
  });
};

module.exports = { deleteUntrackedGitBranches };
