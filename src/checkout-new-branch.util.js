import { getCurrentBranch } from './utils/index.js';

export const checkoutNewBranch = ({ checkoutBranch, displayInfo, executeCommand }) => {
  if (!checkoutBranch) {
    return displayInfo('No checkout branch, staying on current branch');
  }

  const currentBranch = getCurrentBranch({ executeCommand });
  if (checkoutBranch === currentBranch) {
    return displayInfo(`Already on branch ${checkoutBranch}`);
  }

  displayInfo(`Checking out branch ${checkoutBranch}`);
  executeCommand(`git checkout ${checkoutBranch}`, `Failed to check out branch ${checkoutBranch}`);
};
