import {
  getOptions,
  startLog,
  endLog,
  updateGitRemoteTracking,
  checkoutNewBranch,
  updateNewBranch,
  deleteUntrackedGitBranches
} from './src/index.js';

const options = await getOptions();

startLog(options);

updateGitRemoteTracking(options);
checkoutNewBranch(options);
updateNewBranch(options);
deleteUntrackedGitBranches(options);

endLog(options);
