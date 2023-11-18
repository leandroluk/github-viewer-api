import { IUserGithub } from '../entities';
import { IAuthorizedHeaders, IGithubUserRepo } from '../generics';

export type IListGithubUserRepoCase = {
  find(
    headers: IListGithubUserRepoCase.Headers,
    params: IListGithubUserRepoCase.Params,
  ): Promise<IListGithubUserRepoCase.Result>;
};
export namespace IListGithubUserRepoCase {
  export type Headers = IAuthorizedHeaders & {};
  export type Params = Pick<IUserGithub, 'login'>;
  export type Result = Array<IGithubUserRepo>;
}
