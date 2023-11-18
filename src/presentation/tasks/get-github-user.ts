import { IGithubUser } from '#/domain';

export type IGetGithubUserTask = {
  get(data: IGetGithubUserTask.Data): Promise<IGetGithubUserTask.Result>;
};
export namespace IGetGithubUserTask {
  export type Data = Pick<IGithubUser, 'login'>;
  export type Result = IGithubUser | null;
}
