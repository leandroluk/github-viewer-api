import { IEntity, IUserGithub } from '#/domain';

export type IGetGithubUserRemote = {
  get(data: IGetGithubUserRemote.Data): Promise<IGetGithubUserRemote.Result>;
};
export namespace IGetGithubUserRemote {
  export type Data = Pick<IUserGithub, 'login'>;
  export type Result = Omit<IUserGithub, keyof IEntity | 'userId'> | null;
}
