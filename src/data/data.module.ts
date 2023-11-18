import { AdaptersModule, TypeORMModule } from '#/infra';
import { Module, Provider } from '@nestjs/common';
import { AuthorizeUserTask, GetUserByEmailTask } from './tasks';

export const providers: Provider[] = [
  { provide: 'IAuthorizeUserTask', useClass: AuthorizeUserTask },
  { provide: 'IGetUserByEmailTask', useClass: GetUserByEmailTask },
];

@Module({
  imports: [AdaptersModule, TypeORMModule],
  providers,
  exports: providers,
})
export class DataModule {}
