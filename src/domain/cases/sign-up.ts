import { IUser } from '../entities';

export type ISignUpCase = {
  signUp(body: ISignUpCase.Body): Promise<void>;
};
export namespace ISignUpCase {
  export type Body = Pick<IUser, 'email' | 'password'> & {
    github: string;
  };
}
