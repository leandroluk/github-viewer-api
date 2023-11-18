import { Module, Provider } from '@nestjs/common';

import { vars } from '#/vars';
import { DataSource } from 'typeorm';
import { UserEntity, UserGithubEntity } from './entities';
import { TypeORMAddRepo, TypeORMEditRepo, TypeORMSearchRepo } from './repos';

const providers: Provider[] = [
  {
    provide: 'TypeORMDataSource',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: vars.db.postgres,
        synchronize: false,
        logging: vars.env !== 'production',
        entities: [UserEntity, UserGithubEntity],
      });

      return await dataSource.initialize();
    },
  },
  {
    provide: 'TypeORMPing',
    useFactory: (dataSource: DataSource) => {
      return async () => await dataSource.query('SELECT 1');
    },
    inject: ['TypeORMDataSource'],
  },
  {
    provide: 'IAddRepo<IUser>',
    useFactory: (dataSource) => new TypeORMAddRepo(UserEntity, dataSource),
    inject: ['TypeORMDataSource'],
  },
  {
    provide: 'IAddRepo<IUserGithub>',
    useFactory: (dataSource) => new TypeORMAddRepo(UserGithubEntity, dataSource),
    inject: ['TypeORMDataSource'],
  },
  {
    provide: 'IEditRepo<IUser>',
    useFactory: (dataSource) => new TypeORMEditRepo(UserEntity, dataSource),
    inject: ['TypeORMDataSource'],
  },
  {
    provide: 'IEditRepo<IUserGithub>',
    useFactory: (dataSource) => new TypeORMEditRepo(UserGithubEntity, dataSource),
    inject: ['TypeORMDataSource'],
  },
  {
    provide: 'ISearchRepo<IUser>',
    useFactory: (dataSource) => new TypeORMSearchRepo(UserEntity, dataSource),
    inject: ['TypeORMDataSource'],
  },
  {
    provide: 'ISearchRepo<IUserGithub>',
    useFactory: (dataSource) => new TypeORMSearchRepo(UserGithubEntity, dataSource),
    inject: ['TypeORMDataSource'],
  },
];

@Module({
  providers,
  exports: providers,
})
export class TypeORMModule {}
