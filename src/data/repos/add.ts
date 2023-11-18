import { IIndexable } from '#/domain';

export type IAddRepo<T extends IIndexable> = {
  add(data: T): Promise<void>;
};
