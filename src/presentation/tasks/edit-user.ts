import { IEntity, IUser } from '#/domain';

export type IEditUserTask = {
  edit(data: IEditUserTask.Data): Promise<IEditUserTask.Result>;
};
export namespace IEditUserTask {
  export type Data = {
    user: IUser & {};
    changes: Partial<Omit<IUser, keyof IEntity>>;
  };
  export type Result = IUser & {};
}
