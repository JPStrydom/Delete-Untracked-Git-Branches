const {
  getOptions,
  startLog,
  endLog,
  updateGitRemoteTracking,
  checkoutNewBranch,
  updateNewBranch,
  deleteUntrackedGitBranches
} = require('./src');

const options = getOptions();

startLog(options);

updateGitRemoteTracking(options);
checkoutNewBranch(options);
updateNewBranch(options);
deleteUntrackedGitBranches(options);

endLog(options);
