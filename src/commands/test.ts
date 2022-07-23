import { Command } from 'commander';

import { action as testAction } from '@actions/test';

export const command = new Command().command('test').description('test description').action(testAction);
