import { IUser } from '../entities';
import { IAuthorization } from '../generics';

export type ISignInCase = {
  signIn(body: ISignInCase.Body): Promise<ISignInCase.Result>;
};
export namespace ISignInCase {
  export type Body = Pick<IUser, 'email' | 'password'>;
  export type Result = IAuthorization & {};
}
