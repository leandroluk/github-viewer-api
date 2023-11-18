import { IUserGithub } from '../entities';

export type IFindGithubUserCase = {
  find(params: IFindGithubUserCase.Params): Promise<IFindGithubUserCase.Result>;
};
export namespace IFindGithubUserCase {
  export type Params = Pick<IUserGithub, 'login'>;
  export type Result = IUserGithub & {};
}
