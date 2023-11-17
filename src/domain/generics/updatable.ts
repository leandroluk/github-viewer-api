import { IIndexable } from './indexable';

export type IUpdatable = IIndexable & {
  timestamp: Date;
};
