const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

let stepNumber = 1;
const numberOfSteps = 5;

const packageDir = __dirname;
const repoDir = path.join(__dirname, 'test-repo');
const remoteRepoDir = path.join(__dirname, 'test-remote-repo.git');

const packageFilename = fs
  .readdirSync(packageDir)
  .find(file => file.startsWith('delete-untracked-git-branches') && file.endsWith('.tgz'));
const packageFilePath = path.resolve(packageDir, packageFilename);

const display = (content, indent = 0) => console.log(`${indent ? '  '.repeat(indent) : '\n'}${content}`);
const displayProgress = content => display(`[${stepNumber++}/${numberOfSteps}] ${content}`);
const displayInfo = (content, hideBullet) => display(`${hideBullet ? ' ' : '-'} ${content}`, 1);

const runCommand = (command, cwd = repoDir) => {
  const options = { cwd, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] };
  return execSync(command, options)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
};

const setupRemoteRepository = () => {
  fs.mkdirSync(remoteRepoDir);
  runCommand('git init --bare', remoteRepoDir);
  displayInfo(`Initialized a bare repository at ${remoteRepoDir}`);
};

const setupLocalRepository = () => {
  fs.mkdirSync(repoDir);
  runCommand('git init', repoDir);
  runCommand('npm init -y', repoDir); // Add this line
  runCommand('git commit --allow-empty -m "Initial commit"', repoDir);
  displayInfo(`Initialized a test repository at ${repoDir}`);

  runCommand(`git remote add origin "${remoteRepoDir}"`, repoDir);
  displayInfo(`Added remote origin pointing to ${remoteRepoDir}`);

  runCommand('git push -u origin master', repoDir);
};

const installPackage = () => {
  runCommand(`npm install "${packageFilePath}"`);
  displayInfo('Installed the package into the test repository');
};

const createTestBranches = () => {
  runCommand('git branch test-1');
  runCommand('git branch test-2');

  const branches = runCommand('git branch');
  branches.forEach(branch => displayInfo(branch));

  if (!branches.includes('test-1') || !branches.includes('test-2')) {
    throw new Error('Test branches were not created successfully.');
  }
};

const runCliTool = () => {
  let toolOutput = runCommand('npx delete-untracked-git-branches');
  toolOutput.forEach(branch => displayInfo(branch, true));
};

const validateBranchesDeleted = () => {
  const branches = runCommand('git branch');
  if (branches.includes('test-1') || branches.includes('test-2')) {
    throw new Error('Test branches were not deleted.');
  }
};

try {
  // Step 1: Set up the temporary repositories
  displayProgress('Setting up temporary repositories...');
  setupRemoteRepository();
  setupLocalRepository();

  // Step 2: Install the package into the test repository
  displayProgress('Installing the package into the test repository...');
  installPackage();

  // Step 3: Create test branches
  displayProgress('Creating test branches...');
  createTestBranches();

  // Step 4: Run the CLI tool
  displayProgress('Running the delete-untracked-git-branches CLI tool...');
  runCliTool();

  // Step 5: Validate the CLI tool
  displayProgress('Validating that test branches have been deleted...');
  validateBranchesDeleted();

  displayInfo('✅ Test passed: Test branches were successfully deleted.');
} catch (error) {
  displayInfo(`❌ Test failed: ${error.message}`);
  process.exitCode = 1;
}
