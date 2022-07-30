import { got } from 'got';
import { Stream } from 'stream';
import { extract } from 'tar';
import { promisify } from 'util';

const pipeline = promisify(Stream.pipeline);

export type RepoInfo = {
  username: string;
  name: string;
  branch: string;
  filePath: string;
};

export const downloadAndExtractRepo = (root: string, { username, name, branch, filePath }: RepoInfo): Promise<void> => {
  return pipeline(
    got.stream(`https://codeload.github.com/${username}/${name}/tar.gz/${branch}`),
    extract({ cwd: root, strip: filePath ? filePath.split('/').length + 1 : 1 }, [
      `${name}-${branch.replace(/\//g, '-')}${filePath ? `/${filePath}` : ''}`,
    ])
  );
};

/*
TODO:
currently removing the submodules

copied vercel util to download from github
https://github.com/vercel/next.js/blob/canary/packages/create-next-app/helpers/examples.ts

reference from kickjs
https://github.com/andrevenancio/kickjs/blob/master/bin/kickjs.bin.js
*/
