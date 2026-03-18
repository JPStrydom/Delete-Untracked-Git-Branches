import { getUntrackedBranches } from './utils/index.js';

export const deleteUntrackedGitBranches = ({
  checkoutBranch,
  protectedBranches,
  dryRun,
  displayInfo,
  executeCommand
}) => {
  const untrackedBranches = getUntrackedBranches({
    checkoutBranch,
    protectedBranches,
    executeCommand
  });

  if (!untrackedBranches?.length) {
    return displayInfo('No untracked branches to delete');
  }

  if (dryRun) {
    displayInfo('Listing untracked branches:');
    return untrackedBranches.forEach(branch => {
      displayInfo(branch);
    });
  }

  displayInfo('Deleting untracked branches:');
  untrackedBranches.forEach(branch => {
    displayInfo(branch);
    executeCommand(`git branch -D ${branch}`, `Failed to delete branch ${branch}`);
  });
};
