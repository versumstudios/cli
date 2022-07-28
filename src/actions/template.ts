import inquirer, { Answers, Separator } from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora';

import { CONTRACT_VERSUM, ERRORS, getContractFromPlatform, MESSAGES, PLATFORMS, TEZTOK_API } from '@constants';
import { CollectorsType } from '@custom-types/collectors';
import { validateContractAddress } from '@taquito/utils';
import { SaveToFile } from '@utils/csv';
import { error, info } from '@utils/logger';

const handleAction = () => {
  console.log('handle action');
};

export const action = (options: Record<string, string>) => {
  // if options are present, bypass the user promp
  if (options.template) {
    // handleAction(options.template)
    //   .then((message) => info(message))
    //   .catch(() => {
    //     error(ERRORS.ERROR_GENERATE_TEMPLATE);
    //   });
    return;
  }

  // otherwise show user promp
  const questions = [
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template',
      choices: ['Web Token', 'Genk', 'WebGL'],
      default() {
        return PLATFORMS.VERSUM;
      },
    },
  ];

  inquirer.prompt(questions).then(({ template }: Record<string, string>) => {
    // select contract address from platform alias
    // const address: string = getContractFromPlatform(platform as PLATFORMS, token as string) || contract;
    // const spinner = ora(MESSAGES.FETCHING_DATA).start();

    // handleAction(address, token)
    //   .then((message: string) => {
    //     spinner.succeed();
    //     info(message);
    //   })
    //   .catch(() => {
    //     spinner.fail();
    //     error(ERRORS.ERROR_EXPORT_COLLECTOR);
    //   });
    console.log('READY', template);
  });
};
