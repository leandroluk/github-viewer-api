import { IUpdatable } from './updatable';

export type IEntity = IUpdatable & {
  createdAt: Date;
  removedAt: Date | null;
};
