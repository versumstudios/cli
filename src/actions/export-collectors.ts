import inquirer from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora-classic';

import { TEZTOK_API } from '@constants';
import { validateAddress } from '@taquito/utils';
import { SaveToFile } from '@utils/csv';
import { error } from '@utils/logger';

type CollectorsType = {
  holder_address: string;
  amount: number;
  token?: { platform: string; tokenId: string };
}[];

export const action = () => {
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
      type: 'input',
      name: 'address',
      message: 'Enter address',
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
  inquirer.prompt(questions).then(({ format, address }: Record<string, string>) => {
    const spinner = ora('Fetching data...').start();
    fetch(TEZTOK_API, { method: 'POST', body: JSON.stringify({ query, variables: { address } }) })
      .then((e) => e.json())
      .then((e) => e.data.holdings)
      .then(async (collectors: CollectorsType) => {
        const data = collectors.map(({ holder_address, amount, token }) => ({
          address: holder_address,
          amount,
          platform: token ? `${token.platform}` : '',
        }));
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
        const errorMsg = 'Error exporting collectors';
        error(errorMsg);
        spinner.fail(errorMsg);
      });
  });
};
