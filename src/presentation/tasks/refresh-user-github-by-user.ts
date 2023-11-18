import { IUserGithub } from '#/domain';

export type IRefreshUserGithubByUserTask = {
  refresh(data: IRefreshUserGithubByUserTask.Data): Promise<IRefreshUserGithubByUserTask.Result>;
};
export namespace IRefreshUserGithubByUserTask {
  export type Data = Pick<IUserGithub, 'userId'>;
  export type Result = IUserGithub | null;
}
