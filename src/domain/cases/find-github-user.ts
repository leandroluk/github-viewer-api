import { IUserGithub } from '../entities';

export type IFindGithubUserCase = {
  find(body: IFindGithubUserCase.Body): Promise<IFindGithubUserCase.Result>;
};
export namespace IFindGithubUserCase {
  export type Body = Pick<IUserGithub, 'login'>;
  export type Result = IUserGithub & {};
}
