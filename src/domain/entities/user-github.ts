import { IUpdatable } from '../generics';
import { IUser } from './user';

export type IUserGithub = IUpdatable & {
  userId: IUser['id'];
  name: string | null;
  login: string | null;
  followersCount: number | null;
  followingCount: number | null;
  publicReposCount: number | null;
  bio: string | null;
  email: string | null;
  twitterUsername: string | null;
  company: string | null;
  blog: string | null;
};
