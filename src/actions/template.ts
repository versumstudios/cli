import inquirer from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora';

import { ERRORS, MESSAGES } from '../constants';
import { GithubProps } from '../types';
import { bash } from '../utils/bash';
// import { downloadAndExtractRepo } from '../utils/github';
import { error, info } from '../utils/logger';

const handleAction = async (template: string) => {
  const now = Date.now();

  // delete any existing folder and contents
  await bash(`rm -rf ${template}`);

  // create folder
  await bash(`mkdir ${template}`);

  // download template
  // await downloadAndExtractRepo('',);

  return `"${template}" template created in ${Date.now() - now}ms`;
};

export const action = async (options: Record<string, string>) => {
  // if options are present, bypass the user promp
  if (options.template) {
    handleAction(options.template)
      .then((message) => info(message))
      .catch(() => {
        error(ERRORS.ERROR_GENERATE_TEMPLATE);
      });
    return;
  }

  // gets a list of all templates
  const result = await fetch('https://api.github.com/repos/versumstudios/templates/git/trees/main');
  const { tree } = await result.json();

  if (!tree) {
    throw new Error(ERRORS.ERROR_EXPORT_COLLECTOR);
  }

  // filter list to only return folders
  const choices = tree.filter((e: GithubProps) => e.type === 'tree').map((e: GithubProps) => e.path);

  // pass the templates into inquirer
  const questions = [
    {
      type: 'list',
      name: 'template',
      message: MESSAGES.SELECT_TEMPLATE,
      choices,
    },
  ];

  inquirer.prompt(questions).then(({ template }: Record<string, string>) => {
    // select contract address from platform alias
    const spinner = ora(MESSAGES.GENERATE_TEMPLATE).start();

    handleAction(template)
      .then((message: string) => {
        spinner.succeed();
        info(message);
      })
      .catch(() => {
        spinner.fail();
        error(ERRORS.ERROR_GENERATE_TEMPLATE);
      });
  });
};
