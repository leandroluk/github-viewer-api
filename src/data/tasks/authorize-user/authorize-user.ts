import { ICompareHashAdapter, ICreateJwtTokenAdapter } from '#/data/adapters';
import { IAuthorizeUserTask } from '#/presentation/tasks';
import { vars } from '#/vars';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizeUserTask implements IAuthorizeUserTask {
  constructor(
    @Inject('ICompareHashAdapter')
    private readonly compareHash: ICompareHashAdapter,
    @Inject('ICreateJwtTokenAdapter')
    private readonly createJwtToken: ICreateJwtTokenAdapter,
  ) {}

  async authorize(data: IAuthorizeUserTask.Data): Promise<IAuthorizeUserTask.Result> {
    const isSamePassword = await this.compareHash.compare({
      hashed: data.user.password,
      plain: data.password,
    });
    if (isSamePassword) {
      const [accessToken, refreshToken] = await Promise.all([
        this.createJwtToken.create({ subject: data.user.email, expires: vars.jwt.accessTTL, type: 'access' }),
        this.createJwtToken.create({ subject: data.user.email, expires: vars.jwt.refreshTTL, type: 'refresh' }),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    }
  }
}
