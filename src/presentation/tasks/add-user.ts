import { IGithubUser, IUser, IUserGithub } from '#/domain';

export type IAddUserTask = {
  add(data: IAddUserTask.Data): Promise<IAddUserTask.Result>;
};
export namespace IAddUserTask {
  export type Data = {
    user: Pick<IUser, 'email' | 'password'>;
    githubUser: IGithubUser;
  };
  export type Result = IUser & {
    _github: IUserGithub;
  };
}
