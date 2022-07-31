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
