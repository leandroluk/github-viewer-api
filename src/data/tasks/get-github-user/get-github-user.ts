import { Inject, Injectable } from '@nestjs/common';

import { IGetGithubUserRemote } from '#/data/remotes';
import { IGetGithubUserTask } from '#/presentation/tasks';

@Injectable()
export class GetGithubUserTask implements IGetGithubUserTask {
  constructor(
    @Inject('IGetGithubUserRemote')
    private readonly getGithubUserRemote: IGetGithubUserRemote,
  ) {}

  async get(data: IGetGithubUserTask.Data): Promise<IGetGithubUserTask.Result> {
    const githubUser = await this.getGithubUserRemote.get(data);
    return githubUser ?? null;
  }
}
