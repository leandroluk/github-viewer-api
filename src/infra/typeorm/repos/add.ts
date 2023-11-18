import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

import { IAddRepo } from '#/data';
import { IIndexable } from '#/domain';

@Injectable()
export class TypeORMAddRepo<T extends IIndexable> implements IAddRepo<T> {
  constructor(
    private readonly entityClass: EntityTarget<ObjectLiteral> & (new () => T),
    @Inject('TypeORMDataSource')
    private readonly dataSource: DataSource,
  ) {}

  async add(data: T): Promise<void> {
    await this.dataSource //
      .createQueryBuilder()
      .insert()
      .into(this.entityClass)
      .values(data)
      .execute();
  }
}
