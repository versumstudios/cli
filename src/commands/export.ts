import { Command } from 'commander';

import { action as exportTokenCollectorsAction } from '../actions/export-token-collectors';
import { action as exportCollectorsAction } from '../actions/export-wallet-collectors';

const command = new Command('export').description('export token data to csv');
command
  .command('token-collectors')
  .description('exports token collectors')
  .option('-c, --contract <value>', 'contract address')
  .option('-t, --token <value>', 'token id')
  .action(exportTokenCollectorsAction);
command
  .command('wallet-collectors')
  .description('exports wallet collectors')
  .option('-w, --wallet <value>', 'user wallet address')
  .option('-p, --platform <value>', 'platform')
  .action(exportCollectorsAction);

export default command;
