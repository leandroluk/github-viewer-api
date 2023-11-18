import { IUser, IUserGithub } from '#/domain';

export type IAddUserTask = {
  add(data: IAddUserTask.Data): Promise<IAddUserTask.Result>;
};
export namespace IAddUserTask {
  export type Data = Pick<IUser, 'email' | 'password'> & {
    _github: Pick<IUserGithub, 'login'>;
  };
  export type Result = IUser & {
    _github: IUserGithub;
  };
}
