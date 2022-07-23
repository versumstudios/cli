import { Command } from 'commander';

import { action as exportCollectorsAction } from '@actions/export-collectors';
import { action as exportTokenCollectorsAction } from '@actions/export-token-collectors';

export const command = new Command('export');
// usage: versum export token-collectors
command.command('token-collectors').description('exports token collectors').action(exportTokenCollectorsAction);
//usage: versum export collectors
command.command('collectors').description('exports collectors').action(exportCollectorsAction);
