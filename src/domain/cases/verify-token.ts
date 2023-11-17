import { IAuthorizedHeaders } from '../generics';

export type IVerifyTokenCase = {
  verify(headers: IVerifyTokenCase.Headers): Promise<void>;
};
export namespace IVerifyTokenCase {
  export type Headers = IAuthorizedHeaders & {};
}
