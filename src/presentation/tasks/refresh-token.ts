import { IAuthorization, IUser } from '#/domain';

export type IRefreshTokenTask = {
  refresh(data: IRefreshTokenTask.Data): Promise<IRefreshTokenTask.Result>;
};
export namespace IRefreshTokenTask {
  export type Data = Pick<IUser, 'email'>;
  export type Result = IAuthorization | null;
}
