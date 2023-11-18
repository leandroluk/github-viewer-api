import { AdaptersModule, AxiosModule, TypeORMModule } from '#/infra';
import { Module, Provider } from '@nestjs/common';
import {
  AddUserTask,
  AuthorizeUserTask,
  DecodeTokenTask,
  GetGithubUserTask,
  GetUserByEmailTask,
  GetUserGithubByUserTask,
  ListGithubUserReposByLoginTask,
  RefreshTokenTask,
  RefreshUserGithubByUserTask,
} from './tasks';

export const providers: Provider[] = [
  { provide: 'IAddUserTask', useClass: AddUserTask },
  { provide: 'IAuthorizeUserTask', useClass: AuthorizeUserTask },
  { provide: 'IDecodeTokenTask', useClass: DecodeTokenTask },
  { provide: 'IGetGithubUserTask', useClass: GetGithubUserTask },
  { provide: 'IGetUserByEmailTask', useClass: GetUserByEmailTask },
  { provide: 'IGetUserGithubByUserTask', useClass: GetUserGithubByUserTask },
  { provide: 'IListGithubUserReposByLoginTask', useClass: ListGithubUserReposByLoginTask },
  { provide: 'IRefreshTokenTask', useClass: RefreshTokenTask },
  { provide: 'IRefreshUserGithubByUserTask', useClass: RefreshUserGithubByUserTask },
];

@Module({
  imports: [AdaptersModule, AxiosModule, TypeORMModule],
  providers,
  exports: providers,
})
export class DataModule {}
