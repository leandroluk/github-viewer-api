import { ICreateHashAdapter, ICreateUuidAdapter } from '#/data/adapters';
import { IGetUserGithubRemote } from '#/data/remotes';
import { IAddRepo } from '#/data/repos';
import { IUser, IUserGithub } from '#/domain';
import { IAddUserTask } from '#/presentation/tasks';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AddUserTask implements IAddUserTask {
  constructor(
    @Inject('ICreateUuidAdapter')
    private readonly createUuidAdapter: ICreateUuidAdapter,
    @Inject('ICreateHashAdapter')
    private readonly createHashAdapter: ICreateHashAdapter,
    @Inject('IAddRepo<IUser>')
    private readonly addRepoUser: IAddRepo<IUser>,
    @Inject('IGetUserGithubRemote')
    private readonly getUserGithubRemote: IGetUserGithubRemote,
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
    const remoteUserGithub = await this.getUserGithubRemote.get(data._github);
    const userGithub: IUserGithub = {
      id: userGithubId,
      timestamp: now,
      userId: userId,
      bio: remoteUserGithub?.bio,
      blogUrl: remoteUserGithub?.blogUrl,
      company: remoteUserGithub?.company,
      email: remoteUserGithub?.email,
      followersCount: remoteUserGithub?.followersCount,
      followingCount: remoteUserGithub?.followingCount,
      login: remoteUserGithub?.login,
      name: remoteUserGithub?.name,
      publicReposCount: remoteUserGithub?.publicReposCount,
      twitterUsername: remoteUserGithub?.twitterUsername,
    };
    await this.addRepoUserGithub.add(userGithub);
    return {
      ...user,
      _github: userGithub,
    };
  }
}
