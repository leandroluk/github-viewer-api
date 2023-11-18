import { FactoryProvider } from '@nestjs/common';
import { UserEntity, UserGithubEntity } from '../entities';
import { TypeORMAddRepo } from '../repos';

export const addUserProvider: FactoryProvider = {
  provide: 'IAddRepo<IUser>',
  useFactory: (dataSource) => new TypeORMAddRepo(UserEntity, dataSource),
  inject: ['TypeORMDataSource'],
};

export const addUserGithubProvider: FactoryProvider = {
  provide: 'IAddRepo<IUserGithub>',
  useFactory: (dataSource) => new TypeORMAddRepo(UserGithubEntity, dataSource),
  inject: ['TypeORMDataSource'],
};
