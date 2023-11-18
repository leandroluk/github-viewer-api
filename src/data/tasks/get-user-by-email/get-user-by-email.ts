import { ISearchRepo } from '#/data/repos';
import { IUser } from '#/domain';
import { IGetUserByEmailTask } from '#/presentation/tasks';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByEmailTask implements IGetUserByEmailTask {
  constructor(
    @Inject('ISearchRepo<IUser>')
    private readonly searchRepoUser: ISearchRepo<IUser>,
  ) {}
  async get(data: IGetUserByEmailTask.Data): Promise<IGetUserByEmailTask.Result> {
    const {
      items: [item],
    } = await this.searchRepoUser.search({
      where: { email: { eq: data.email } },
    });
    return item || null;
  }
}
