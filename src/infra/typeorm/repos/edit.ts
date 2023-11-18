import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

import { IEditRepo } from '#/data';
import { IIndexable } from '#/domain/generics';

@Injectable()
export class TypeORMEditRepo<Type extends IIndexable> implements IEditRepo<Type> {
  constructor(
    private readonly entityClass: EntityTarget<ObjectLiteral> & (new () => Type),
    @Inject('TypeORMDataSource')
    private readonly dataSource: DataSource,
  ) {}

  async edit(data: IEditRepo.Data<Type>): Promise<void> {
    await this.dataSource //
      .createQueryBuilder()
      .update(this.entityClass)
      .set(data.changes)
      .where('id = :id', { id: data.id })
      .execute();
  }
}
