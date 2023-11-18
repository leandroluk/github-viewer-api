import { IAuthorization, IUser } from '#/domain';

export type IAuthorizeUserTask = {
  authorize(data: IAuthorizeUserTask.Data): Promise<IAuthorizeUserTask.Result>;
};
export namespace IAuthorizeUserTask {
  export type Data = {
    user: Pick<IUser, 'email' | 'password'>;
    password: IUser['password'];
  };
  export type Result = IAuthorization & {};
}
