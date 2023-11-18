import { IIndexable, ISearch } from '#/domain/generics';

export type ISearchRepo<T extends IIndexable> = {
  search(query: ISearchRepo.Query<T>): Promise<ISearchRepo.Result<T>>;
};
export namespace ISearchRepo {
  export type Query<T extends IIndexable> = ISearch.Query<T> & {};
  export type Result<T extends IIndexable> = ISearch.Result<T>;
}
