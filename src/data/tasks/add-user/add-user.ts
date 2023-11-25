import { Inject, Injectable } from '@nestjs/common';

import { ICreateHashAdapter, ICreateUuidAdapter } from '#/data/adapters';
import { IGetGithubUserRemote } from '#/data/remotes';
import { IAddRepo } from '#/data/repos';
import { IUser, IUserGithub } from '#/domain';
import { IAddUserTask } from '#/presentation/tasks';

@Injectable()
export class AddUserTask implements IAddUserTask {
  constructor(
    @Inject('ICreateUuidAdapter')
    private readonly createUuidAdapter: ICreateUuidAdapter,
    @Inject('ICreateHashAdapter')
    private readonly createHashAdapter: ICreateHashAdapter,
    @Inject('IAddRepo<IUser>')
    private readonly addRepoUser: IAddRepo<IUser>,
    @Inject('IGetGithubUserRemote')
    private readonly getGithubUserRemote: IGetGithubUserRemote,
    @Inject('IAddRepo<IUserGithub>')
    private readonly addRepoUserGithub: IAddRepo<IUserGithub>,
  ) {}

  async add(data: IAddUserTask.Data): Promise<IAddUserTask.Result> {
    const [userId, userGithubId, hashedPassword] = await Promise.all([
      this.createUuidAdapter.create(),
      this.createUuidAdapter.create(),
      this.createHashAdapter.create(data.user.password),
    ]);
    const now = new Date();
    const user: IUser = {
      id: userId,
      timestamp: now,
      createdAt: now,
      removedAt: null,
      email: data.user.email,
      password: hashedPassword,
    };
    await this.addRepoUser.add(user);
    const userGithub: IUserGithub = {
      id: userGithubId,
      timestamp: now,
      userId: userId,
      bio: data.githubUser.bio,
      blogUrl: data.githubUser.blogUrl,
      company: data.githubUser.company,
      email: data.githubUser.email,
      followersCount: data.githubUser.followersCount,
      followingCount: data.githubUser.followingCount,
      login: data.githubUser.login,
      name: data.githubUser.name,
      publicReposCount: data.githubUser.publicReposCount,
      twitterUsername: data.githubUser.twitterUsername,
    };
    await this.addRepoUserGithub.add(userGithub);
    return {
      ...user,
      _github: userGithub,
    };
  }
}
