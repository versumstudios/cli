import fs from 'fs';

export const makeDirectory = async (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const copyDirectoy = async (origin: string, destination: string) => {
  fs.cpSync(origin, destination, { recursive: true });
};

export const deleteDirectory = async (dir: string) => {
  fs.rmSync(dir, { recursive: true, force: true });
};

export const writeFile = (file: string, title: string, description: string) => {
  fs.readFile(file, 'utf8', (e, data) => {
    if (e) {
      throw e;
    }

    const result = data.replace('**TITLE**', title.replace(/ /g, '-')).replace('**DESCRIPTION**', description);

    fs.writeFile(file, result, 'utf8', (error) => {
      if (error) {
        throw error;
      }
      return false;
    });
    return false;
  });
};

export const parseFiles = async (dir: string, title: string, description: string) => {
  const getAllFiles = (dirPath: string, arrayOfFiles?: string[]) => {
    const files = fs.readdirSync(dirPath);

    let af = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
        af = getAllFiles(dirPath + '/' + file, af);
      } else {
        af.push(`${dirPath}/${file}`);
      }
    });

    return af;
  };

  const files = getAllFiles(dir);
  files.forEach((file) => writeFile(file, title, description));
};
