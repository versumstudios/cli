import chalk from 'chalk';

import pkg from '../package.json';

export const LOGO = `
██╗   ██╗███████╗██████╗ ███████╗██╗   ██╗███╗   ███╗
██║   ██║██╔════╝██╔══██╗██╔════╝██║   ██║████╗ ████║
██║   ██║█████╗  ██████╔╝███████╗██║   ██║██╔████╔██║
╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╔╝██║
 ╚████╔╝ ███████╗██║  ██║███████║╚██████╔╝██║ ╚═╝ ██║
  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝`;

export const PACKAGE = pkg;

export const VERSION = `v:${PACKAGE.version}`;

export const DESCRIPTION = `
${LOGO} ${chalk.bgBlack(chalk.green(VERSION))}`;

export const TEZTOK_API = 'https://api.teztok.com/v1/graphql';

export enum PLATFORMS {
  ALL = 'all platforms',
  VERSUM = 'versum',
  HICETNUNC = 'hicetnunc',
  FXHASH = 'fxhash',
  OBJKTCOM = 'objktcom',
  EIGHTBIDOU = '8bidou',
  TYPED = 'typed',
  OTHER = 'other',
}

export const CONTRACT_HICETNUNC = 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton';
export const CONTRACT_VERSUM = 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW';
export const CONTRACT_FXHASH = 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE';
export const CONTRACT_FXHASH2 = 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi';
export const CONTRACT_8BIDOU1 = 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp';
export const CONTRACT_8BIDOU2 = 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf';
export const CONTRACT_8BIDOU3 = 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3';
export const CONTRACT_TYPED = 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK';

export const getContractFromPlatform = (platform: PLATFORMS, token_id: string) => {
  switch (platform) {
    case PLATFORMS.VERSUM:
      return CONTRACT_VERSUM;
    case PLATFORMS.HICETNUNC:
      return CONTRACT_HICETNUNC;
    case PLATFORMS.EIGHTBIDOU:
      return CONTRACT_8BIDOU1;
    case PLATFORMS.TYPED:
      return CONTRACT_TYPED;
    case PLATFORMS.FXHASH:
      return parseInt(token_id) > 589145 ? CONTRACT_FXHASH2 : CONTRACT_FXHASH;
    default:
      return false;
  }
};

export const getKeyFromPlatform = (platform: PLATFORMS) => {
  switch (platform) {
    case PLATFORMS.VERSUM:
      return 'VERSUM';
    case PLATFORMS.HICETNUNC:
      return 'HEN';
    case PLATFORMS.FXHASH:
      return 'FXHASH';
    case PLATFORMS.OBJKTCOM:
      return 'OBJKT';
    case PLATFORMS.EIGHTBIDOU:
      return '8BIDOU';
    case PLATFORMS.TYPED:
      return 'TYPED';
    default:
      return false;
  }
};

export enum MESSAGES {
  FETCHING_DATA = 'Fetching data',
  GENERATE_TEMPLATE = 'Generate template',
  SELECT_PLATFORM = 'Select platform',
  SELECT_TEMPLATE = 'Select template',
  ENTER_USER_ADDRESS = 'Enter wallet address',
  ENTER_CONTRACT_ADDRESS = 'Enter contract address',
  ENTER_TOKEN_ID = 'Enter Token ID',
}

export enum ERRORS {
  ERROR_INVALID_ADDRESS = 'Invalid address',
  ERROR_EXPORT_COLLECTOR = 'Error exporting collectors',
  ERROR_GENERATE_TEMPLATE = 'Error generate template',
}
