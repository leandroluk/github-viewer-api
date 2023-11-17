import { IAuthorizedHeaders } from '../generics';

export type IRefreshMyProfileCase = {
  refresh(headers: IRefreshMyProfileCase.Headers): Promise<void>;
};
export namespace IRefreshMyProfileCase {
  export type Headers = IAuthorizedHeaders & {};
}
