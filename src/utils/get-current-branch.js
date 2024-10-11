const getCurrentBranch = ({ executeCommand }) =>
  executeCommand('git branch --show-current', 'Failed to get current Git branch')
    .toString()
    .replace('\n', '');

module.exports = { getCurrentBranch };
``;
