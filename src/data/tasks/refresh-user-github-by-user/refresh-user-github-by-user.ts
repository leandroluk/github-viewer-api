import { Inject, Injectable } from '@nestjs/common';

import { IGetGithubUserRemote } from '#/data/remotes';
import { IEditRepo, ISearchRepo } from '#/data/repos';
import { IUserGithub } from '#/domain';
import { IRefreshUserGithubByUserTask } from '#/presentation/tasks';

@Injectable()
export class RefreshUserGithubByUserTask implements IRefreshUserGithubByUserTask {
  constructor(
    @Inject('ISearchRepo<IUserGithub>')
    private readonly searchRepoUserGithub: ISearchRepo<IUserGithub>,
    @Inject('IGetGithubUserRemote')
    private readonly getGithubUserRemote: IGetGithubUserRemote,
    @Inject('IEditRepo<IUserGithub>')
    private readonly editRepoUserGithub: IEditRepo<IUserGithub>,
  ) {}

  async refresh(data: IRefreshUserGithubByUserTask.Data): Promise<IRefreshUserGithubByUserTask.Result> {
    const {
      items: [userGithub],
    } = await this.searchRepoUserGithub.search({
      where: { userId: { eq: data.userId } },
    });
    if (userGithub) {
      const githubUser = await this.getGithubUserRemote.get(userGithub);
      const { id, ...changes }: IUserGithub = {
        id: userGithub.id,
        userId: userGithub.userId,
        timestamp: new Date(),
        bio: githubUser.bio,
        blogUrl: githubUser.blogUrl,
        company: githubUser.company,
        email: githubUser.email,
        followersCount: githubUser.followersCount,
        followingCount: githubUser.followingCount,
        login: githubUser.login,
        name: githubUser.name,
        publicReposCount: githubUser.publicReposCount,
        twitterUsername: githubUser.twitterUsername,
      };
      await this.editRepoUserGithub.edit({ id, changes });
      return { id, ...changes };
    }
  }
}
