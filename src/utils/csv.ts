import ObjectsToCsv from 'objects-to-csv';

import { log } from './logger';

export const SaveToFile = async (filename: string, data: object[]) => {
  const csv = new ObjectsToCsv(data);
  await csv.toDisk(`./${filename}`);
  log('file saved:', `./${filename}`);
};
