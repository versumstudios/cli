import { Command } from 'commander';

import { action as templateAction } from '@actions/template';

export const command = new Command()
  .command('template')
  .description('creates a new project from a template')
  .action(templateAction);
