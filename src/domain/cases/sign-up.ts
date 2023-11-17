import { IUser, IUserGithub } from '../entities';

export type ISignUpCase = {
  signUp(body: ISignUpCase.Body): Promise<void>;
};
export namespace ISignUpCase {
  export type Body = Pick<IUser, 'email' | 'password'> & {
    _github: Pick<IUserGithub, 'login'>;
  };
}
