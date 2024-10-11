const startLog = ({ checkoutBranch, protectedBranches, dryRun, display, displayInfo }) => {
  display('Deleting untracked Git branches:');
  displayInfo(`Checkout Branch: ${checkoutBranch ?? 'None'}`);
  displayInfo(`Protected Branches: ${protectedBranches ?? 'None'}`);
  displayInfo(`Dry Run: ${dryRun ? 'Yes' : 'No'}`);
};

module.exports = { startLog };
