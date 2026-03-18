export const updateGitRemoteTracking = ({ executeCommand }) => {
  executeCommand('git remote update origin --prune', 'Failed to update Git remote tracking');
};
