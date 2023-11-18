import { IGithubUser, IUpdatable } from '../generics';
import { IUser } from './user';

export type IUserGithub = IUpdatable &
  IGithubUser & {
    userId: IUser['id'];
  };
