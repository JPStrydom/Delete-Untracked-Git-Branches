# Delete Untracked Git Branches

Delete all those annoying untracked local Git branches in one fell swoop.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
- [Examples](#examples)
  - [Delete All Untracked Branches](#delete-all-untracked-branches)
  - [Checkout a Branch Before Deletion](#checkout-a-branch-before-deletion)
  - [Protect Certain Branches from Deletion](#protect-certain-branches-from-deletion)
  - [Dry Run](#dry-run)
- [Contributing](#contributing)
- [License](#license)

## Overview

`delete-untracked-git-branches` is a command-line tool that helps you clean up your local Git repository by deleting branches that are no longer tracked by a remote repository or have been merged. This is particularly useful when you have numerous local branches that are not needed anymore, and you want to delete them quickly without manually checking each one.

**Note:** Ensure that you don't have any uncommitted changes before running the script, as it might encounter issues or cause data loss.

## Installation

You can install `delete-untracked-git-branches` globally using npm:

```shell
npm install -g delete-untracked-git-branches
```

Alternatively, install it as a development dependency in your project:

```shell
npm install --save-dev delete-untracked-git-branches
```

Or, you can use it without installing by using `npx`:

```shell
npx delete-untracked-git-branches [options]
```

## Usage

The `delete-untracked-git-branches` script supports the following options:

### Options

| Option                 | Alias | Description                                                    | Type      | Default |
| ---------------------- | ----- | -------------------------------------------------------------- | --------- | ------- |
| `--checkout-branch`    | `-c`  | The branch to checkout before performing the branch deletions. | `string`  |         |
| `--protected-branches` | `-p`  | Comma-separated list of branches to exclude from deletion.     | `string`  |         |
| `--dry-run`            | `-d`  | Lists untracked branches without deleting them.                | `boolean` | `false` |

## Examples

### Delete All Untracked Branches

To delete all your untracked branches:

```shell
delete-untracked-git-branches
```

### Checkout a Branch Before Deletion

If you want to checkout another branch (e.g., `development`) before deleting untracked branches:

```shell
delete-untracked-git-branches -c development
```

### Protect Certain Branches from Deletion

To protect certain branches (e.g., `development` and `main`) from being deleted:

```shell
delete-untracked-git-branches -p development,main
```

### Dry Run

To list all untracked branches without deleting them (dry run):

```shell
delete-untracked-git-branches -d
```

This command will display the branches that would be deleted without actually deleting them.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/JPStrydom/Delete-Untracked-Git-Branches).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
