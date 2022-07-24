import inquirer from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora-classic';

import { TEZTOK_API, PLATFORMS, MESSAGES, getTezTokPlatform } from '@constants';
import { validateAddress } from '@taquito/utils';
import { SaveToFile } from '@utils/csv';
import { error } from '@utils/logger';

type CollectorsType = {
  holder_address: string;
  amount: number;
  token?: { platform: string; tokenId: string };
}[];

const mapCollectors = (collectors: CollectorsType) => {
  return collectors.map(({ holder_address, amount, token }) => ({
    address: holder_address,
    amount,
    platform: token ? `${token.platform}` : '',
  }));
};

export const action = (hasPlatform: boolean) => {
  const questions = [
    {
      type: 'list',
      name: 'format',
      message: 'Select data format',
      choices: ['unique', 'full'],
      default() {
        return 'unique';
      },
    },
    {
      type: 'list',
      name: 'platform',
      message: MESSAGES.SELECT_PLATFORM,
      choices: [PLATFORMS.VERSUM, PLATFORMS.HICETNUNC, PLATFORMS.FXHASH,],
      when: hasPlatform,
      default() {
        return 'unique';
      },
    },
    {
      type: 'input',
      name: 'address',
      message: MESSAGES.ENTER_ADDRESS,
      validate: async (input: string) => {
        if ((await validateAddress(input)) === 3) {
          return true;
        }
        error('\nInvalid address');
        return false;
      },
      default() {
        return 'tz1...';
      },
    },
  ];

  const query = `
    query GetUserCollectors($address: String!) {
    holdings(where: {token: {artist_address: {_eq: $address}}, amount: {_gt: "0"}, holder_address: {_nregex: "^KT*", _neq: "tz1burnburnburnburnburnburnburjAYjjX"}}) {
      amount
      holder_address
      token {
        platform
        fa2_address
        token_id
      }
    }
  }`;
  inquirer.prompt(questions).then(({ format, address, platform }: Record<string, string>) => {
    const spinner = ora(MESSAGES.FETCHING_DATA).start();
    fetch(TEZTOK_API, { method: 'POST', body: JSON.stringify({ query, variables: { address } }) })
      .then((e) => e.json())
      .then((e) => e.data.holdings)
      .then(async (collectors: CollectorsType) => {
        const data = hasPlatform
          ? mapCollectors(collectors).filter((e) => e.platform === getTezTokPlatform(platform as PLATFORMS))
          : mapCollectors(collectors);
        spinner.succeed();
        if (format === 'unique') {
          // Use set to remove duplicates and convert to object[]
          const uniqueData = new Set(data.map((e) => e.address));
          const csvData = [...uniqueData].map((e) => ({ address: e }));
          await SaveToFile(`collectors-${format}-${address}.csv`, csvData);
          return;
        }
        await SaveToFile(`collectors-${format}-${address}.csv`, data);
      })
      .catch(() => {
        spinner.fail(MESSAGES.ERROR_COLLECTOR_EXPORT);
      });
  });
};
