import ora from 'ora';

export const error = function (message: string) {
  ora(message).fail();
  process.exit(1);
};

export const log = function (message: string) {
  ora(message).succeed();
};

export const info = function (message: string) {
  ora(message).info();
};
