import inquirer, { Answers, Separator } from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora';

import { CONTRACT_VERSUM, ERRORS, getContractFromPlatform, MESSAGES, PLATFORMS, TEZTOK_API } from '@constants';
import { CollectorsType } from '@custom-types/collectors';
import { validateContractAddress } from '@taquito/utils';
import { SaveToFile } from '@utils/csv';
import { error, info } from '@utils/logger';

const handleAction = (address: string, token: string) => {
  const query = `
  query GetTokenCollectors($address: String!, $token: String!) {
    tokens_by_pk(fa2_address: $address, token_id: $token) {
      holdings(where: { amount: { _gt: "0" } }) {
        holder_address
        amount
      }
    }
  }`;

  return fetch(TEZTOK_API, { method: 'POST', body: JSON.stringify({ query, variables: { address, token } }) })
    .then((e) => e.json())
    .then((e) => e.data.tokens_by_pk.holdings)
    .then(async (collectors: CollectorsType) => {
      // parse data
      const data = collectors.map(({ holder_address, amount }) => ({
        address: holder_address,
        amount,
      }));
      const filename = await SaveToFile(`token-collectors-${address}-${token}.csv`, data);
      return `File saved ${filename}`;
    });
};

export const action = (options: Record<string, string>) => {
  // if options are present, bypass the user promp
  if (options.contract && options.token) {
    handleAction(options.contract, options.token)
      .then((message) => info(message))
      .catch(() => {
        error(ERRORS.ERROR_EXPORT_COLLECTOR);
      });
    return;
  }

  // otherwise show user promp
  const questions = [
    {
      type: 'list',
      name: 'platform',
      message: MESSAGES.SELECT_PLATFORM,
      choices: [PLATFORMS.VERSUM, PLATFORMS.HICETNUNC, PLATFORMS.FXHASH, new Separator(), PLATFORMS.OTHER],
      default() {
        return PLATFORMS.VERSUM;
      },
    },
    {
      type: 'input',
      name: 'contract',
      message: MESSAGES.ENTER_CONTRACT_ADDRESS,
      when: (answers: Answers) => answers.platform === PLATFORMS.OTHER,
      validate: async (input: string) => {
        if ((await validateContractAddress(input)) === 3) {
          return true;
        }
        return ERRORS.ERROR_INVALID_ADDRESS;
      },
      default() {
        return CONTRACT_VERSUM;
      },
    },
    {
      type: 'input',
      name: 'token',
      message: MESSAGES.ENTER_TOKEN_ID,
      default() {
        return '0';
      },
    },
  ];

  inquirer.prompt(questions).then(({ platform, contract, token }: Record<string, string>) => {
    // select contract address from platform alias
    const address: string = getContractFromPlatform(platform as PLATFORMS, token as string) || contract;
    const spinner = ora(MESSAGES.FETCHING_DATA).start();

    handleAction(address, token)
      .then((message: string) => {
        spinner.succeed();
        info(message);
      })
      .catch(() => {
        spinner.fail();
        error(ERRORS.ERROR_EXPORT_COLLECTOR);
      });
  });
};
