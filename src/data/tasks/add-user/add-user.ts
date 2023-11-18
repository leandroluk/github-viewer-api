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
      this.createHashAdapter.create(data.password),
    ]);
    const now = new Date();
    const user: IUser = {
      id: userId,
      timestamp: now,
      createdAt: now,
      removedAt: null,
      email: data.email,
      password: hashedPassword,
    };
    await this.addRepoUser.add(user);
    const githubUser = await this.getGithubUserRemote.get(data._github);
    const userGithub: IUserGithub = {
      id: userGithubId,
      timestamp: now,
      userId: userId,
      bio: githubUser?.bio,
      blogUrl: githubUser?.blogUrl,
      company: githubUser?.company,
      email: githubUser?.email,
      followersCount: githubUser?.followersCount,
      followingCount: githubUser?.followingCount,
      login: githubUser?.login,
      name: githubUser?.name,
      publicReposCount: githubUser?.publicReposCount,
      twitterUsername: githubUser?.twitterUsername,
    };
    await this.addRepoUserGithub.add(userGithub);
    return {
      ...user,
      _github: userGithub,
    };
  }
}
