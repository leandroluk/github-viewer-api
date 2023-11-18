import { IUser, IUserGithub } from '../entities';
import { IAuthorizedHeaders } from '../generics';

export type IGetMyProfileCase = {
  get(headers: IGetMyProfileCase.Headers): Promise<IGetMyProfileCase.Result>;
};
export namespace IGetMyProfileCase {
  export type Headers = IAuthorizedHeaders & {};
  export type Result = Omit<IUser, 'timestamp' | 'removedAt' | 'password'> & {
    _github: Omit<IUserGithub, 'id' | 'timestamp' | 'userId'>;
  };
}
