# Delete-Untracked-Git-Branches

Delete all those annoying untracked Git branches in one foul swoop

## Installation

```shell
npm i delete-untracked-git-branches -D
```

## Usage

The delete-untracked-git-branches script has the following options:

| Option                 | Alias | Description                                                                   | Type     | Required | Default |
| ---------------------- | ----- | ----------------------------------------------------------------------------- | -------- | :------: | ------- |
| `--checkout-branch`    | `-c`  | A branch to checkout before performing the branch deletes.                    | `string` |          |         |
| `--protected-branches` | `-p`  | Branches to exclude from the branch deletes. These should be comma-separated. | `string` |          |         |

_NOTE: Make sure that you don't have any uncommitted changes, else the script will likely encounter issues._

## Examples

If you want to delete all your untracked branches, the following script can be run:

```shell
delete-untracked-git-branches
```

If you want to checkout another branch, say `development`, before deleting all your untracked branches, the following script can be run:

```shell
delete-untracked-git-branches -- -c development
```

If you want to protect certain branches from being deleted, say `development` and `main`, the following script can be run:

```shell
delete-untracked-git-branches -- -p development,main
```

If you're having trouble running the above commands on older Windows terminals you can try adding another argument delimiter (`--`), for example:

```shell
delete-untracked-git-branches -- -- -c development -p development,main
```
