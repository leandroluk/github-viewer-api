export type ICompareHashAdapter = {
  compare(data: ICompareHashAdapter.Data): Promise<boolean>;
};
export namespace ICompareHashAdapter {
  export type Data = {
    hashed: string;
    plain: string;
  };
}
