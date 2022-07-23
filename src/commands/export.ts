import { Command } from 'commander';

import { action as exportTokenCollectorsAction } from '@actions/export-token-collectors';

export const command = new Command('export');
// usage: versum export token-collectors
command.command('token-collectors').description('exports token collectors').action(exportTokenCollectorsAction);
