const { getOptions } = require('./get-options');
const { startLog } = require('./start-log');
const { updateGitRemoteTracking } = require('./update-git-remote-tracking');
const { checkoutNewBranch } = require('./checkout-new-branch');
const { updateNewBranch } = require('./update-new-branch');
const { deleteUntrackedGitBranches } = require('./delete-untracked-git-branches');
const { endLog } = require('./end-log');

module.exports = {
  getOptions,
  startLog,
  endLog,
  updateGitRemoteTracking,
  checkoutNewBranch,
  updateNewBranch,
  deleteUntrackedGitBranches
};
