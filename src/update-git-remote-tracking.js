const updateGitRemoteTracking = ({ displayProgress, executeCommand }) => {
  displayProgress('Updating Git remote tracking');
  executeCommand('git remote update origin --prune', 'Failed to update Git remote tracking');
};

module.exports = { updateGitRemoteTracking };
