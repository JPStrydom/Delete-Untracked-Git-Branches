const createUntrackedBranchFilter =
  ({ checkoutBranch, protectedBranches }) =>
  ([branchName, upstreamBranch, upstreamTrack]) =>
    branchName &&
    branchName !== checkoutBranch &&
    !protectedBranches?.includes(branchName) &&
    (!upstreamBranch || upstreamTrack === '[gone]');

const getUntrackedBranches = ({ checkoutBranch, protectedBranches, executeCommand }) =>
  executeCommand(
    'git for-each-ref refs/heads --format="%(refname:short) %(upstream:short) %(upstream:track)"'
  )
    .split('\n')
    .map(branchRef => branchRef.split(' '))
    .filter(createUntrackedBranchFilter({ checkoutBranch, protectedBranches }))
    .map(([branchName]) => branchName);

module.exports = { getUntrackedBranches };
