import {
  getOptions,
  updateGitRemoteTracking,
  checkoutNewBranch,
  updateNewBranch,
  deleteUntrackedGitBranches
} from './src/index.js';

const options = await getOptions();
const {
  checkoutBranch,
  protectedBranches,
  dryRun,
  display,
  displayInfo,
  displayProgress,
  displayDone,
  displayFinish
} = options;

display('Deleting untracked Git branches:');
displayInfo(`Checkout Branch: ${checkoutBranch || 'None'}`);
displayInfo(`Protected Branches: ${protectedBranches || 'None'}`);
displayInfo(`Dry Run: ${dryRun ? 'Yes' : 'No'}`);

displayProgress('Updating Git remote tracking');
updateGitRemoteTracking(options);
displayDone();

displayProgress('Checking out new branch');
checkoutNewBranch(options);
displayDone();

displayProgress('Updating new branch from origin');
updateNewBranch(options);
displayDone();

displayProgress('Finding and deleting untracked branches');
deleteUntrackedGitBranches(options);
displayDone();

displayFinish();
