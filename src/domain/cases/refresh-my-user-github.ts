import { IAuthorizedHeaders } from '../generics';

export type IRefreshMyUserGithubCase = {
  refresh(headers: IRefreshMyUserGithubCase.Headers): Promise<void>;
};
export namespace IRefreshMyUserGithubCase {
  export type Headers = IAuthorizedHeaders & {};
}
