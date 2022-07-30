import child_process from 'child_process';

export const bash = (command: string) => {
  return new Promise(function (resolve, reject) {
    child_process.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};
