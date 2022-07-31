export type CollectorsType = {
  holder_address: string;
  amount: number;
  token?: {
    platform: string;
    token_id: string;
  };
}[];

export type GithubProps = {
  path: string;
  type: string;
};
