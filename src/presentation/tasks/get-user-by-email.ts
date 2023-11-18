import { IUser } from '#/domain';

export type IGetUserByEmailTask = {
  get(data: IGetUserByEmailTask.Data): Promise<IGetUserByEmailTask.Result>;
};
export namespace IGetUserByEmailTask {
  export type Data = Pick<IUser, 'email'>;
  export type Result = IUser | null;
}
