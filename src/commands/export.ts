import { Command } from 'commander';

import { action as exportCollectorsAction } from '@actions/export-collectors';
import { action as exportTokenCollectorsAction } from '@actions/export-token-collectors';
import { action as exportWalletHistory } from '@actions/export-wallet-history';

export const command = new Command('export').description('export token data to csv');
// usage: versum export token-collectors
command.command('token-collectors').description('exports token collectors').action(exportTokenCollectorsAction);
//usage: versum export collectors
command
  .command('collectors')
  .description('exports collectors')
  .option('-p, --platform', 'select platform to export from')
  .action((option) => {
    exportCollectorsAction(option.platform);
  });
//usage: versum export wallet-history
command.command('wallet-history').description('exports wallet history').action(exportWalletHistory);
