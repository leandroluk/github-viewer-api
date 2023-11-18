import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

import { ISearchRepo } from '#/data';
import { IIndexable, ISearch } from '#/domain';

import { vars } from '#/vars';

type OperatorFn = (field: string, value: any) => [string, ObjectLiteral];

@Injectable()
export class TypeORMSearchRepo<T extends IIndexable> implements ISearchRepo<T> {
  private readonly operatorsMap: Record<ISearch.Operators, OperatorFn> = {
    eq: (field, value) => [`(x.${field} = :${field})`, { [field]: value }],
    gt: (field, value) => [`(x.${field} > :${field})`, { [field]: value }],
    gte: (field, value) => [`(x.${field} >= :${field})`, { [field]: value }],
    lt: (field, value) => [`(x.${field} < :${field})`, { [field]: value }],
    lte: (field, value) => [`(x.${field} <= :${field})`, { [field]: value }],
    in: (field, value) => [`(x.${field} IN (:...${field}))`, { [field]: value }],
    like: (field, value) => [`(x.${field} ILIKE :${field})`, { [field]: `%${value as string}% ` }],
    neq: (field, value) => [`(NOT(x.${field} = : ${field}))`, { [field]: value }],
    ngt: (field, value) => [`(NOT(x.${field} > : ${field}))`, { [field]: value }],
    ngte: (field, value) => [`(NOT(x.${field} >= : ${field}))`, { [field]: value }],
    nlt: (field, value) => [`(NOT(x.${field} < : ${field}))`, { [field]: value }],
    nlte: (field, value) => [`(NOT(x.${field} <= : ${field}))`, { [field]: value }],
    nin: (field, value) => [`(NOT(x.${field} IN(: ...${field})))`, { [field]: value }],
    nlike: (field, value) => [`(NOT(x.${field} ILIKE : ${field}))`, { [field]: ` % ${value as string}%` }],
  };

  constructor(
    private readonly entityTarget: EntityTarget<ObjectLiteral> & (new () => T),
    @Inject('TypeORMDataSource')
    private readonly dataSource: DataSource,
  ) {}

  async search(query: ISearchRepo.Query<T>): Promise<ISearch.Result<T>> {
    const availableFields = this.dataSource
      .getMetadata(this.entityTarget)
      .columns.map((column) => column.propertyName) as Array<string & keyof T>;
    const fullTextFields = (this.entityTarget as any).fullTextFields ?? [];

    let selectedFields: string[] = availableFields!;

    if (query.fields?.select) {
      selectedFields = query.fields.select;
    } else if (query.fields?.remove) {
      selectedFields = availableFields!.filter((field) => !query.fields!.remove!.includes(field));
    }

    let builder = this.dataSource
      .getRepository(this.entityTarget)
      .createQueryBuilder()
      .from(this.entityTarget, 'x')
      .select(selectedFields.map((field) => `x.${field}`))
      .where('1 = 1');

    if (query.text) {
      // see: https://www.freecodecamp.org/news/fuzzy-string-matching-with-postgresql/
      const matcher = fullTextFields!
        .map((field: string) => [
          `x.${field} ILIKE :perc`,
          `SOUNDEX(x.${field}) = SOUNDEX(:raw) > 4`,
          `LEVENSHTEIN(LOWER(x.${field}), LOWER(:raw)) < 4`,
        ])
        .flatMap((inner: string) => inner)
        .join(' OR ');

      builder = builder.andWhere(`(${matcher})`, {
        raw: query.text,
        perc: `%${query.text}%`,
      });
    }

    if (query.where) {
      Object.entries(query.where).forEach(([field, condition]) => {
        Object.entries(condition as ISearch.Query.Where<T>).forEach(([op, value]) => {
          if (op === 'eq' && value === null) {
            builder = builder.andWhere(`(x.${field} IS NULL)`);
          } else {
            const [text, parameters] = this.operatorsMap[op as ISearch.Operators](field, value);
            builder = builder.andWhere(text, parameters);
          }
        });
      });
    }

    if (query.sort) {
      Object.entries(query.sort).forEach(([field, value]) => {
        builder = builder.addOrderBy(field, value === 1 ? 'ASC' : 'DESC');
      });
    }

    const { offset = 0, limit = vars.db.limit } = query;

    const [items, total] = await builder.skip(offset).take(limit).getManyAndCount();

    return {
      items: items as Array<T>,
      total,
      limit,
      offset,
    };
  }
}
