import { IUser } from '../entities';
import { IAuthorizedHeaders, IEntity } from '../generics';

export type IEditMyUserCase = {
  edit(headers: IEditMyUserCase.Headers, body: IEditMyUserCase.Body): Promise<void>;
};
export namespace IEditMyUserCase {
  export type Headers = IAuthorizedHeaders & {};
  export type Body = Partial<Omit<IUser, keyof IEntity>>;
}
