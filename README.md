# @versumstudios/cli

The command-line interface for versum.

## Install

To install the latest version of Versum CLI, run this command:

```bash
npm i -g @versumstudios/cli
```

## Get started

```bash
versum
```

## Develop

Follow the steps below to run the CLI locally:

1. Make sure you do not have any instance of @versumstudios/cli already installed. You can also verify if the CLI is installed by running `npm list -g --depth 0`. If you have a previous version installed you should uninstall it via `yarn local:uninstall`.

2. Install all dependencies by running `yarn`

3. Run `yarn local:link`. It should create a symlink pointing to `./bin/src/index.js`.

4. Run `yarn start` to transpile the typescript into javascript.

5. Every time you need to test a new command, just type `versum <command>`.
