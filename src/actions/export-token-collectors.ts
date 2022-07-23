import inquirer, { Answers } from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora-classic';

import { CONTRACT_VERSUM, getContractFromPlatform, PLATFORMS, TEZTOK_API } from '@constants';
import { validateContractAddress } from '@taquito/utils';
import { SaveToFile } from '@utils/csv';
import { error } from '@utils/logger';

type CollectorsType = {
  holder_address: string;
  amount: number;
}[];

export const action = () => {
  const questions = [
    {
      type: 'list',
      name: 'platform',
      message: 'Select platform',
      choices: [PLATFORMS.VERSUM, PLATFORMS.HICETNUNC, PLATFORMS.FXHASH, PLATFORMS.OTHER],
      default() {
        return PLATFORMS.VERSUM;
      },
    },
    {
      type: 'input',
      name: 'contract',
      message: 'Enter contract address',
      when: (answers: Answers) => answers.platform === PLATFORMS.OTHER,
      validate: async (input: string) => {
        if ((await validateContractAddress(input)) === 3) {
          return true;
        }
        error('\nInvalid contract address');
        return false;
      },
      default() {
        return CONTRACT_VERSUM;
      },
    },
    {
      type: 'input',
      name: 'token',
      message: 'Enter token id',
      default() {
        return '0';
      },
    },
  ];
  const query = `
    query GetTokenCollectors($address: String!, $token: String!) {
      tokens_by_pk(fa2_address: $address, token_id: $token) {
        holdings(where: { amount: { _gt: "0" } }) {
          holder_address
          amount
        }
      }
    }`;

  inquirer.prompt(questions).then(({ platform, contract, token }: Record<string, string>) => {
    // select contract address from platform
    const address: string = getContractFromPlatform(platform as PLATFORMS, token as string) || contract;
    const spinner = ora('Fetching data...').start();

    fetch(TEZTOK_API, { method: 'POST', body: JSON.stringify({ query, variables: { address, token } }) })
      .then((e) => e.json())
      .then((e) => e.data.tokens_by_pk.holdings)
      .then(async (collectors: CollectorsType) => {
        // parse data
        const data = collectors.map(({ holder_address, amount }) => ({
          address: holder_address,
          amount,
        }));
        spinner.succeed();
        await SaveToFile(`collectors-${platform}-${address}-${token}.csv`, data);
      })
      .catch(() => {
        const errorMsg = 'Error exporting collectors';
        error(errorMsg);
        spinner.fail(errorMsg);
      });
  });
};
