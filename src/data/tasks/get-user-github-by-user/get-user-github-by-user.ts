import { Inject, Injectable } from '@nestjs/common';

import { ISearchRepo } from '#/data/repos';
import { IUserGithub } from '#/domain';
import { IGetUserGithubByUserTask } from '#/presentation/tasks';

@Injectable()
export class GetUserGithubByUserTask implements IGetUserGithubByUserTask {
  constructor(
    @Inject('ISearchRepo<IUserGithub>')
    private readonly searchRepoUserGithub: ISearchRepo<IUserGithub>,
  ) {}

  async get(data: IGetUserGithubByUserTask.Data): Promise<IUserGithub> {
    const {
      items: [userGithub],
    } = await this.searchRepoUserGithub.search({
      where: { userId: { eq: data.userId } },
    });
    return userGithub ?? null;
  }
}
