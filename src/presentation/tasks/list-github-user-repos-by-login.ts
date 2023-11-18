import { IGithubUser, IGithubUserRepo } from '#/domain';

export type IListGithubUserReposByLoginTask = {
  list(data: IListGithubUserReposByLoginTask.Data): Promise<IListGithubUserReposByLoginTask.Result>;
};
export namespace IListGithubUserReposByLoginTask {
  export type Data = Pick<IGithubUser, 'login'>;
  export type Result = Array<IGithubUserRepo> | null;
}
