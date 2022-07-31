import fs from 'fs';
import inquirer from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora';

import { ERRORS, MESSAGES } from '../constants';
import { GithubProps } from '../types';
import { copyDirectoy, deleteDirectory, makeDirectory, parseFiles } from '../utils/filesystem';
import { downloadAndExtractRepo } from '../utils/github';
import { error, info } from '../utils/logger';

const DEFAULT_NAME = 'my-app';
const DEFAULT_DESCRIPTION = '@versumstudios/cli template';

const GITHUB_USER = 'versumstudios';
const GITHUB_REPO = 'templates';
const GITHUB_BRANCH = 'main';

const handleAction = async (
  template: string,
  name: string = DEFAULT_NAME,
  description: string = DEFAULT_DESCRIPTION
) => {
  const now = Date.now();

  const appName = name.replace(/\s+/g, '-').toLowerCase();
  const appDescription = description.toLowerCase();

  const rootDir = process.cwd();
  const tempDir = `${rootDir}/temp`;
  const templateDir = `${tempDir}/${template}`;
  const targetDir = `${rootDir}/${appName}`;

  if (fs.existsSync(targetDir)) {
    throw new Error('Directory already exists');
  }

  await makeDirectory(tempDir);

  await downloadAndExtractRepo(tempDir, {
    username: GITHUB_USER,
    name: GITHUB_REPO,
    branch: GITHUB_BRANCH,
  });

  await copyDirectoy(templateDir, targetDir);

  await deleteDirectory(tempDir);

  await parseFiles(targetDir, appName, appDescription);

  return `"${template}" template created in ${Date.now() - now}ms`;
};

export const action = async (options: Record<string, string>) => {
  // if options are present, bypass the user promp
  if (options.template) {
    handleAction(options.template)
      .then((message) => info(message))
      .catch((e) => {
        error(e?.toString() || ERRORS.ERROR_GENERATE_TEMPLATE);
      });
    return;
  }

  // gets a list of all templates
  const result = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}`);
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
        return DEFAULT_NAME;
      },
    },
    {
      type: 'input',
      name: 'description',
      message: MESSAGES.ENTER_PROJECT_DESCRIPTION,
      default() {
        return DEFAULT_DESCRIPTION;
      },
    },
    {
      type: 'list',
      name: 'template',
      message: MESSAGES.SELECT_TEMPLATE,
      choices,
    },
  ];

  inquirer.prompt(questions).then(({ template, name, description }: Record<string, string>) => {
    const spinner = ora(MESSAGES.GENERATE_TEMPLATE).start();

    handleAction(template, name, description)
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
