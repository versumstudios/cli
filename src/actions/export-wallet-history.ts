import inquirer, { Answers } from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora-classic';

import { CONTRACT_VERSUM, getContractFromPlatform, PLATFORMS, TZKT_API, COINCODEX_API, MESSAGES } from '@constants';
import { validateAddress } from '@taquito/utils';
import { SaveToFile } from '@utils/csv';
import { error } from '@utils/logger';

type CoinCodexType = Array<Array<[string, number, number, number]>>
type CoinCodexReturnType = { timestamp: string, value: number }

class CustomDate extends Date {
    toShortISOString(): string {
        return this.toISOString().split('T')[0];
    }
}

// return yyyy-mm-dd string of wallet creation
const getWalletCreationDate = (address: string): Promise<string> => {
    const url: URL = new URL(`v1/accounts/${address}`, TZKT_API);
    return fetch(url)
        .then((e) => e.json())
        .then((e) => new CustomDate(e.firstActivityTime).toShortISOString());
}

const getHistoricalRates = (creationDate: string): Promise<CoinCodexReturnType> => {
    const now = new CustomDate(Date.now()).toShortISOString();
    // get interval of days between creationDate and now for sampling
    const sampleSize = Math.floor((new CustomDate(Date.now()).getTime() - new CustomDate(creationDate).getTime()) / (1000 * 60 * 60 * 24));
    const url: URL = new URL(`coincodex/get_coin_history/xtz/${creationDate}/${now}/${sampleSize}`, COINCODEX_API);
    return fetch(url)
        .then((e) => e.json())
        .then((e) => e.XTZ)
        .then((e) => e.map((e: CoinCodexType) => ({ timestamp: e[0], value: e[1] })));
}

export const action = () => {
    const questions = [
        {
            type: 'input',
            name: 'address',
            message: MESSAGES.ENTER_ADDRESS,
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
        {
            type: 'list',
            name: 'currency',
            message: 'Select currency',
            choices: ['USD', 'EUR'],
            default() {
                return 'USD';
            }
        }
    ];
    inquirer.prompt(questions).then(async ({currency, address}: Record<string, string>) => {
        console.log(await getHistoricalRates(await getWalletCreationDate(address)));
    });
}
