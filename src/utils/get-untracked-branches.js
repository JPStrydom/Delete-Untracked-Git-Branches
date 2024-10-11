const getUntrackedBranches = ({ checkoutBranch, protectedBranches, executeCommand }) =>
  executeCommand('git branch -vv')
    .toString()
    .split('\n')
    .filter(branch => branch.includes(': gone]'))
    .map(branch => branch.trim().split(' ')[0])
    .filter(branch => branch !== checkoutBranch && !protectedBranches?.includes(branch));

module.exports = { getUntrackedBranches };
