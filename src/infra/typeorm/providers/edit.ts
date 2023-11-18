import { FactoryProvider } from '@nestjs/common';
import { UserEntity, UserGithubEntity } from '../entities';
import { TypeORMEditRepo } from '../repos/edit';

export const editUserProvider: FactoryProvider = {
  provide: 'IEditRepo<IUser>',
  useFactory: (dataSource) => new TypeORMEditRepo(UserEntity, dataSource),
  inject: ['TypeORMDataSource'],
};

export const editUserGithubProvider: FactoryProvider = {
  provide: 'IEditRepo<IUserGithub>',
  useFactory: (dataSource) => new TypeORMEditRepo(UserGithubEntity, dataSource),
  inject: ['TypeORMDataSource'],
};
