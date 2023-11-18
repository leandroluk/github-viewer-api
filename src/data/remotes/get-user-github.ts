import { IEntity, IUserGithub } from '#/domain';

export type IGetUserGithubRemote = {
  get(data: IGetUserGithubRemote.Data): Promise<IGetUserGithubRemote.Result>;
};
export namespace IGetUserGithubRemote {
  export type Data = Pick<IUserGithub, 'login'>;
  export type Result = Omit<IUserGithub, keyof IEntity | 'userId'> | null;
}
