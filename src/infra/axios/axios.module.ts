import { Module, Provider } from '@nestjs/common';
import { GetUserGithubRemote } from './get-user-github-remote';

const providers: Provider[] = [{ provide: 'IGetUserGithubRemote', useClass: GetUserGithubRemote }];

@Module({
  providers,
  exports: providers,
})
export class AxiosModule {}
