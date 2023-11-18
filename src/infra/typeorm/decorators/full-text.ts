import { IIndexable } from '#/domain';

export function FullText<T extends IIndexable>(...fields: Array<string & keyof T>): ClassDecorator {
  return function (target: any) {
    (target as any)['@fulltextFields'] = fields;
  };
}
