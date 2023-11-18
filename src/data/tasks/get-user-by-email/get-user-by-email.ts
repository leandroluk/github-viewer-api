import { ISearchRepo } from '#/data/repos';
import { IUser } from '#/domain';
import { IGetUserByEmailTask } from '#/presentation/tasks';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByEmailTask implements IGetUserByEmailTask {
  constructor(
    @Inject('ISearchRepo<IUser>')
    private readonly searchUser: ISearchRepo<IUser>,
  ) {}
  async get(data: IGetUserByEmailTask.Data): Promise<IGetUserByEmailTask.Result> {
    const {
      items: [item],
    } = await this.searchUser.search({
      where: {
        email: { eq: data.email },
        // removedAt: { eq: null },
      },
    });
    return item || null;
  }
}
