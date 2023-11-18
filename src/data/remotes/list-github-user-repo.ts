import { IGithubUserRepo, IUserGithub } from '#/domain';

export type IListGithubUserRepoRemote = {
  list(data: IListGithubUserRepoRemote.Data): Promise<IListGithubUserRepoRemote.Result>;
};
export namespace IListGithubUserRepoRemote {
  export type Data = Pick<IUserGithub, 'login'>;
  export type Result = Array<IGithubUserRepo> | null;
}
