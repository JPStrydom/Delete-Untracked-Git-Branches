import { getCurrentBranch } from './utils/index.js';

export const updateNewBranch = ({ displayInfo, executeCommand }) => {
  const currentBranch = getCurrentBranch({ executeCommand });
  displayInfo(`Updating branch ${currentBranch} from origin`);
  executeCommand(`git pull origin ${currentBranch}`, `Failed to update branch ${currentBranch} from origin`);
};
