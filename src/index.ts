#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import updateNotifier from 'update-notifier';

import { COMMANDS, DESCRIPTION, PACKAGE } from '@constants';

const main = async () => {
  // check for updates
  await updateNotifier({
    pkg: PACKAGE,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 1, // 1 day
  }).notify();

  // cli
  program.name('versum');
  program.description(DESCRIPTION);
  program.version(PACKAGE.version);
  program.usage('<command> --argument');

  // commands
  const loadCommands = async () => {
    const files = fs.readdirSync(COMMANDS);

    for (const file of files) {
      const { command } = await import(`${COMMANDS}/${file}`);
      program.addCommand(command);
    }
  };

  await loadCommands();

  program.parse(process.argv);

  // everything is okay
  return 0;
};

const handleRejection = async (err: Error | unknown) => {
  if (err) {
    if (err instanceof Error) {
      await handleUnexpected(err);
    } else {
      console.error(`An unexpected rejection occurred\n  ${err}`);
    }
  } else {
    console.error('An unexpected empty rejection occurred');
  }

  process.exit(1);
};

const handleUnexpected = async (err: Error) => {
  console.error(`An unexpected error occurred!\n${err}`);

  process.exit(1);
};

process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);

main()
  .then((exitCode) => {
    process.exitCode = exitCode;
  })
  .catch(handleUnexpected);
