import { IAuthorizedHeaders, IGithubUser } from '../generics';

export type IGetGithubUserCase = {
  get(headers: IGetGithubUserCase.Headers, params: IGetGithubUserCase.Params): Promise<IGetGithubUserCase.Result>;
};
export namespace IGetGithubUserCase {
  export type Headers = IAuthorizedHeaders & {};
  export type Params = Pick<IGithubUser, 'login'>;
  export type Result = IGithubUser & {};
}
