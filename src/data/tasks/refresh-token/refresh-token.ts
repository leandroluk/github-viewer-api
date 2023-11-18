import { Inject, Injectable } from '@nestjs/common';

import { ICreateJwtTokenAdapter } from '#/data/adapters';
import { ISearchRepo } from '#/data/repos';
import { IUser } from '#/domain';
import { IRefreshTokenTask } from '#/presentation/tasks';
import { vars } from '#/vars';

@Injectable()
export class RefreshTokenTask implements IRefreshTokenTask {
  constructor(
    @Inject('ISearchRepo<IUser>')
    private readonly searchRepoUser: ISearchRepo<IUser>,
    @Inject('ICreateJwtTokenAdapter')
    private readonly createJwtTokenAdapter: ICreateJwtTokenAdapter,
  ) {}

  async refresh(data: IRefreshTokenTask.Data): Promise<IRefreshTokenTask.Result> {
    const {
      items: [user],
    } = await this.searchRepoUser.search({
      where: { email: { eq: data.email } },
    });
    if (user && !user.removedAt) {
      const { email: subject } = data;
      const [accessToken, refreshToken] = await Promise.all([
        this.createJwtTokenAdapter.create({ subject, expires: vars.jwt.accessTTL, type: 'access' }),
        this.createJwtTokenAdapter.create({ subject, expires: vars.jwt.refreshTTL, type: 'refresh' }),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    }
    return null;
  }
}
