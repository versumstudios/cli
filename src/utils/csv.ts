import ObjectsToCsv from 'objects-to-csv';

export const SaveToFile = async (filename: string, data: object[]) => {
  const parsed = filename.replace(/\s/g, '-');
  const csv = new ObjectsToCsv(data);
  await csv.toDisk(`./${parsed}`);
  return parsed;
};
