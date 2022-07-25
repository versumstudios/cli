import inquirer, { Separator } from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora';

import { ERRORS, getKeyFromPlatform, MESSAGES, PLATFORMS, TEZTOK_API } from '@constants';
import { CollectorsType } from '@custom-types/collectors';
import { validateAddress } from '@taquito/utils';
import { SaveToFile } from '@utils/csv';
import { error, info } from '@utils/logger';

const handleAction = (address: string, platform?: PLATFORMS) => {
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

  return fetch(TEZTOK_API, { method: 'POST', body: JSON.stringify({ query, variables: { address } }) })
    .then((e) => e.json())
    .then((e) => e.data.holdings)
    .then(async (collectors: CollectorsType) => {
      // parse data
      const data = collectors
        .map(({ holder_address, amount, token }) => ({
          address: holder_address,
          amount,
          platform: token ? token.platform : '',
          token: token ? token.token_id : '',
        }))
        .filter((e) => {
          if (platform === PLATFORMS.ALL) {
            return true;
          }
          return e.platform === getKeyFromPlatform(platform as PLATFORMS);
        });
      const filename = await SaveToFile(`wallet-collectors-${address}-${platform}.csv`, data);
      return `File saved ${filename}`;
    });
};

export const action = (options: Record<string, string>) => {
  // if options are present, bypass the user promp
  if (options.wallet) {
    handleAction(options.wallet, (options.platform as PLATFORMS) || PLATFORMS.ALL)
      .then((message) => info(message))
      .catch(() => {
        error(ERRORS.ERROR_EXPORT_COLLECTOR);
      });
    return;
  }

  const questions = [
    {
      type: 'input',
      name: 'address',
      message: MESSAGES.ENTER_USER_ADDRESS,
      validate: async (input: string) => {
        if ((await validateAddress(input)) === 3) {
          return true;
        }

        return ERRORS.ERROR_INVALID_ADDRESS;
      },
      // TODO: https://github.com/versumstudios/cli/issues/20
      // default() {
      //   return 'tz1gi68wGST7UtzkNpnnc354mpqCcVNQVcSw';
      // },
    },
    {
      type: 'list',
      name: 'platform',
      message: MESSAGES.SELECT_PLATFORM,
      choices: [
        PLATFORMS.VERSUM,
        PLATFORMS.HICETNUNC,
        PLATFORMS.FXHASH,
        PLATFORMS.OBJKTCOM,
        new Separator(),
        PLATFORMS.ALL,
      ],
      default() {
        return PLATFORMS.ALL;
      },
    },
  ];

  inquirer.prompt(questions).then(({ address, platform }: Record<string, string>) => {
    const spinner = ora(MESSAGES.FETCHING_DATA).start();

    handleAction(address, platform as PLATFORMS)
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
