import { Inject, Injectable } from '@nestjs/common';

import { IEditRepo } from '#/data/repos';
import { IUser } from '#/domain';
import { IEditUserTask } from '#/presentation/tasks';

@Injectable()
export class EditUserTask implements IEditUserTask {
  constructor(
    @Inject('IEditRepo<IUser>')
    private readonly editRepoUser: IEditRepo<IUser>,
  ) {}

  async edit(data: IEditUserTask.Data): Promise<IEditUserTask.Result> {
    const newUser: IUser = {
      ...data.user,
      timestamp: new Date(),
      ...data.changes,
    };
    await this.editRepoUser.edit({ id: data.user.id, changes: data.changes });
    return newUser;
  }
}
