import { ICompareHashAdapter, ICreateJwtTokenAdapter } from '#/data/adapters';
import { IAuthorizeUserTask } from '#/presentation/tasks';
import { vars } from '#/vars';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizeUserTask implements IAuthorizeUserTask {
  constructor(
    @Inject('ICompareHashAdapter')
    private readonly compareHashAdapter: ICompareHashAdapter,
    @Inject('ICreateJwtTokenAdapter')
    private readonly createJwtTokenAdapter: ICreateJwtTokenAdapter,
  ) {}

  async authorize(data: IAuthorizeUserTask.Data): Promise<IAuthorizeUserTask.Result> {
    const {
      password: plain,
      user: { email: subject, password: hashed },
    } = data;
    const isSamePassword = await this.compareHashAdapter.compare({ hashed, plain });
    if (isSamePassword) {
      const [accessToken, refreshToken] = await Promise.all([
        this.createJwtTokenAdapter.create({ subject, expires: vars.jwt.accessTTL, type: 'access' }),
        this.createJwtTokenAdapter.create({ subject, expires: vars.jwt.refreshTTL, type: 'refresh' }),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    }
  }
}
