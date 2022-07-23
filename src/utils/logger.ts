/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';

const _error = console.error;
const _log = console.log;
const _info = console.info;

export const error = function (...args: any) {
  _error(chalk.bgBlack(chalk.red.apply(console, args)));
  process.exit(1);
};

export const log = function (...args: any) {
  _log(chalk.bgBlack(chalk.green.apply(console, args)));
};

export const info = function (...args: any) {
  _info(chalk.bgBlack(chalk.blue.apply(console, args)));
};
