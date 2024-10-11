const { getCurrentBranch } = require('./utils');

const checkoutNewBranch = ({ checkoutBranch, displayProgress, executeCommand }) => {
  if (!checkoutBranch) {
    return displayProgress('No checkout branch, staying on current branch');
  }

  const currentBranch = getCurrentBranch({ executeCommand });
  if (checkoutBranch === currentBranch) {
    return displayProgress(`Already on branch ${checkoutBranch}`);
  }

  displayProgress(`Checking out branch ${checkoutBranch}`);
  executeCommand(`git checkout ${checkoutBranch}`, `Failed to check out branch ${checkoutBranch}`);
};

module.exports = { checkoutNewBranch };
