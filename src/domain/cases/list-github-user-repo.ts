import { IUserGithub } from '../entities';

export type IListGithubUserRepoCase = {
  find(params: IListGithubUserRepoCase.Params): Promise<IListGithubUserRepoCase.Result>;
};
export namespace IListGithubUserRepoCase {
  export type Params = Pick<IUserGithub, 'login'>;
  export type Result = IUserGithub & {};
}
