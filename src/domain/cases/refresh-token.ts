import { IAuthorization } from '../generics';

export type IRefreshTokenCase = {
  verify(headers: IRefreshTokenCase.Headers): Promise<IRefreshTokenCase.Result>;
};
export namespace IRefreshTokenCase {
  export type Headers = {
    authorization: `Bearer ${string}`;
  };
  export type Result = IAuthorization & {};
}
