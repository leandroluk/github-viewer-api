import { AdaptersModule, AxiosModule, TypeORMModule } from '#/infra';
import { Module, Provider } from '@nestjs/common';
import {
  AddUserTask,
  AuthorizeUserTask,
  DecodeTokenTask,
  GetUserByEmailTask,
  GetUserGithubByUserTask,
  RefreshTokenTask,
} from './tasks';

export const providers: Provider[] = [
  { provide: 'IAddUserTask', useClass: AddUserTask },
  { provide: 'IAuthorizeUserTask', useClass: AuthorizeUserTask },
  { provide: 'IDecodeTokenTask', useClass: DecodeTokenTask },
  { provide: 'IGetUserByEmailTask', useClass: GetUserByEmailTask },
  { provide: 'IRefreshTokenTask', useClass: RefreshTokenTask },
  { provide: 'IGetUserGithubByUserTask', useClass: GetUserGithubByUserTask },
];

@Module({
  imports: [AdaptersModule, AxiosModule, TypeORMModule],
  providers,
  exports: providers,
})
export class DataModule {}
