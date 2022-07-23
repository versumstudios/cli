import chalk from 'chalk';
import fs from 'fs';

export const LOGO = `
                                                     
██╗   ██╗███████╗██████╗ ███████╗██╗   ██╗███╗   ███╗
██║   ██║██╔════╝██╔══██╗██╔════╝██║   ██║████╗ ████║
██║   ██║█████╗  ██████╔╝███████╗██║   ██║██╔████╔██║
╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╔╝██║
 ╚████╔╝ ███████╗██║  ██║███████║╚██████╔╝██║ ╚═╝ ██║
  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝`;

export const COMMANDS = `${__dirname}/commands`;

export const ACTIONS = './actions';

export const PACKAGE = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8'));

export const VERSION = `${PACKAGE.name} ${PACKAGE.version}`;

export const DESCRIPTION = `
${LOGO}
${chalk.bgBlack(chalk.green(VERSION))}`;
