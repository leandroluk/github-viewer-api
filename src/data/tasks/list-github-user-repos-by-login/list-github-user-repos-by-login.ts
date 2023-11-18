import { Inject, Injectable } from '@nestjs/common';

import { IListGithubUserRepoRemote } from '#/data/remotes';
import { IListGithubUserReposByLoginTask } from '#/presentation/tasks';

@Injectable()
export class ListGithubUserReposByLoginTask implements IListGithubUserReposByLoginTask {
  constructor(
    @Inject('IListGithubUserRepoRemote')
    private readonly listGithubUserRepoRemote: IListGithubUserRepoRemote,
  ) {}

  async list(data: IListGithubUserReposByLoginTask.Data): Promise<IListGithubUserReposByLoginTask.Result> {
    const repos = await this.listGithubUserRepoRemote.list(data);
    return repos ?? null;
  }
}
