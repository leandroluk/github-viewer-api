import { FactoryProvider } from '@nestjs/common';
import { UserEntity, UserGithubEntity } from '../entities';
import { TypeORMSearchRepo } from '../repos/search';

export const searchUserProvider: FactoryProvider = {
  provide: 'ISearchRepo<IUser>',
  useFactory: (dataSource) => new TypeORMSearchRepo(UserEntity, dataSource),
  inject: ['TypeORMDataSource'],
};

export const searchUserGithubProvider: FactoryProvider = {
  provide: 'ISearchRepo<IUserGithub>',
  useFactory: (dataSource) => new TypeORMSearchRepo(UserGithubEntity, dataSource),
  inject: ['TypeORMDataSource'],
};
