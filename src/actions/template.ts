import fs from 'fs';
import inquirer from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora';

// import path from 'path';
import { ERRORS, MESSAGES } from '../constants';
import { GithubProps } from '../types';
import { copyDirectoy, deleteDirectory, makeDirectory } from '../utils/filesystem';
import { downloadAndExtractRepo } from '../utils/github';
import { error, info } from '../utils/logger';

const handleAction = async (name = 'my-app', template: string) => {
  const now = Date.now();

  const appName = name.replace(/\s+/g, '-').toLowerCase();

  const rootDir = process.cwd();
  const tempDir = `${rootDir}/temp`;
  const templateDir = `${tempDir}/${template}`;
  const targetDir = `${rootDir}/${appName}`;

  if (fs.existsSync(targetDir)) {
    throw new Error('Directory exists');
  }

  await makeDirectory(tempDir);

  await downloadAndExtractRepo(tempDir, {
    username: 'versumstudios',
    name: 'templates',
    branch: 'main',
  });

  await copyDirectoy(templateDir, targetDir);

  await deleteDirectory(tempDir);

  return `"${template}" template created in ${Date.now() - now}ms`;
};

export const action = async (options: Record<string, string>) => {
  // if options are present, bypass the user promp
  if (options.template) {
    handleAction(options.name, options.template)
      .then((message) => info(message))
      .catch((e) => {
        error(e?.toString() || ERRORS.ERROR_GENERATE_TEMPLATE);
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
      type: 'input',
      name: 'name',
      message: MESSAGES.ENTER_PROJECT_NAME,
      default() {
        return 'my-app';
      },
    },
    {
      type: 'list',
      name: 'template',
      message: MESSAGES.SELECT_TEMPLATE,
      choices,
    },
  ];

  inquirer.prompt(questions).then(({ name, template }: Record<string, string>) => {
    // select contract address from platform alias
    const spinner = ora(MESSAGES.GENERATE_TEMPLATE).start();

    handleAction(name, template)
      .then((message: string) => {
        spinner.succeed();
        info(message);
      })
      .catch((e) => {
        spinner.fail();
        error(e?.toString() || ERRORS.ERROR_GENERATE_TEMPLATE);
      });
  });
};
