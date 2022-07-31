import { Command } from 'commander';

import { action as templateAction } from '../actions/template';

const command = new Command()
  .command('template')
  .description('creates a new project from a template')
  .option('-n, --name <value>', 'specify a name')
  .option('-t, --template <value>', 'specify a template')
  .action(templateAction);

export default command;
