import { Module, Provider } from '@nestjs/common';
import { GetGithubUserRemote } from './get-github-user-remote';
import { ListGithubUserRepoRemote } from './list-github-user-repo-remote';

const providers: Provider[] = [
  { provide: 'IGetGithubUserRemote', useClass: GetGithubUserRemote },
  { provide: 'IListGithubUserRepoRemote', useClass: ListGithubUserRepoRemote },
];

@Module({
  providers,
  exports: providers,
})
export class AxiosModule {}
