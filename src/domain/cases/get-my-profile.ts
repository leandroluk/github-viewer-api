import { IUserGithub } from '../entities';
import { IAuthorizedHeaders } from '../generics';

export type IGetMyProfileCase = {
  get(headers: IGetMyProfileCase.Headers): Promise<IGetMyProfileCase.Result>;
};
export namespace IGetMyProfileCase {
  export type Headers = IAuthorizedHeaders & {};
  export type Result = IUserGithub & {};
}
