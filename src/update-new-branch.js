const { getCurrentBranch } = require('./utils');

const updateNewBranch = ({ displayProgress, executeCommand }) => {
  const currentBranch = getCurrentBranch({ executeCommand });
  displayProgress(`Updating branch ${currentBranch} from origin`);
  executeCommand(`git pull origin ${currentBranch}`, `Failed to update branch ${currentBranch} from origin`);
};

module.exports = { updateNewBranch };
