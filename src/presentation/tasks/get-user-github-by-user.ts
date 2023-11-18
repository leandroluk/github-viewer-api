import { IUserGithub } from '#/domain';

export type IGetUserGithubByUserTask = {
  get(data: IGetUserGithubByUserTask.Data): Promise<IGetUserGithubByUserTask.Result>;
};
export namespace IGetUserGithubByUserTask {
  export type Data = Pick<IUserGithub, 'userId'>;
  export type Result = IUserGithub | null;
}
