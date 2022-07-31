#!/usr/bin/env node
import { program } from 'commander';
import updateNotifier from 'update-notifier';

import testExport from './commands/export';
import testTemplate from './commands/template';
import testCommand from './commands/test';
import { error } from './utils/logger';
import { DESCRIPTION, PACKAGE } from './constants';

const main = async () => {
  // check for updates
  await updateNotifier({
    pkg: PACKAGE,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7,
  }).notify();

  // cli
  program.name('versum');
  program.description(DESCRIPTION);
  program.version(PACKAGE.version);
  program.usage('<command>');

  // commands
  program.addCommand(testExport);
  program.addCommand(testTemplate);
  program.addCommand(testCommand);

  program.parse(process.argv);

  // everything is okay
  return 0;
};

const handleRejection = async (err: Error | unknown) => {
  if (err) {
    if (err instanceof Error) {
      await handleUnexpected();
    } else {
      error('An unexpected rejection occurred');
    }
  } else {
    error('An unexpected empty rejection occurred');
  }
};

const handleUnexpected = async () => {
  error('An unexpected error occurred');
};

process.on('unhandledRejection', handleRejection);
process.on('uncaughtException', handleUnexpected);

main()
  .then((exitCode) => {
    process.exitCode = exitCode;
  })
  .catch(handleUnexpected);
