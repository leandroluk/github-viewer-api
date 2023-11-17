import { IEntity } from '../generics';

export type IUser = IEntity & {
  email: string;
  password: string;
};
