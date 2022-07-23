import chalk from 'chalk';
import fs from 'fs';

export const LOGO = `
                                                     
██╗   ██╗███████╗██████╗ ███████╗██╗   ██╗███╗   ███╗
██║   ██║██╔════╝██╔══██╗██╔════╝██║   ██║████╗ ████║
██║   ██║█████╗  ██████╔╝███████╗██║   ██║██╔████╔██║
╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╔╝██║
 ╚████╔╝ ███████╗██║  ██║███████║╚██████╔╝██║ ╚═╝ ██║
  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝`;

export const COMMANDS = `${__dirname}/commands`;

export const ACTIONS = './actions';

export const PACKAGE = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8'));

export const VERSION = `${PACKAGE.name} ${PACKAGE.version}`;

export const DESCRIPTION = `
${LOGO}
${chalk.bgBlack(chalk.green(VERSION))}`;

export const TEZTOK_API = 'https://api.teztok.com/v1/graphql';

export enum PLATFORMS {
  VERSUM = 'versum',
  HICETNUNC = 'hicetnunc',
  FXHASH = 'fxhash',
  OBJKT = 'objkt',
  OTHER = 'other',
}

export const CONTRACT_HICETNUNC = 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton';
export const CONTRACT_VERSUM = 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW';
export const CONTRACT_FXHASH = 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE';
export const CONTRACT_FXHASH2 = 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi';

export const getContractFromPlatform = (platform: PLATFORMS, token_id: string) => {
  switch (platform) {
    case PLATFORMS.VERSUM:
      return CONTRACT_VERSUM;
    case PLATFORMS.HICETNUNC:
      return CONTRACT_HICETNUNC;
    case PLATFORMS.FXHASH:
      return parseInt(token_id) > 589145 ? CONTRACT_FXHASH2 : CONTRACT_FXHASH;
    default:
      return false;
  }
};

export const convertTezTokPlatform = (platform: PLATFORMS) => {
  switch (platform) {
    case PLATFORMS.VERSUM:
      return 'VERSUM';
    case PLATFORMS.HICETNUNC:
      return 'HEN';
    case PLATFORMS.FXHASH:
      return 'FXHASH';
    case PLATFORMS.OBJKT:
      return 'OBJKT';
    default:
      return false;
  }
};

export enum MESSAGES {
  SELECT_PLATFORM = 'Select platform',
  ERROR_COLLECTOR_EXPORT = 'Error exporting collectors',
  FETCHING_DATA = 'Fetching data...',
}
