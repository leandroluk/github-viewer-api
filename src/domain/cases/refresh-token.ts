import { IAuthorization, IAuthorizedHeaders } from '../generics';

export type IRefreshTokenCase = {
  verify(headers: IRefreshTokenCase.Headers): Promise<IRefreshTokenCase.Result>;
};
export namespace IRefreshTokenCase {
  export type Headers = IAuthorizedHeaders & {};
  export type Result = IAuthorization & {};
}
