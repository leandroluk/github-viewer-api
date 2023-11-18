import { IIndexable } from '#/domain';

export type IEditRepo<T extends IIndexable> = {
  edit(data: IEditRepo.Data<T>): Promise<void>;
};
export namespace IEditRepo {
  export type Data<T extends IIndexable> = {
    id: T['id'];
    changes: Partial<Omit<T, keyof IIndexable>>;
  };
}
