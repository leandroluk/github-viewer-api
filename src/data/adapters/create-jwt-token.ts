export type ICreateJwtTokenAdapter = {
  create(data: ICreateJwtTokenAdapter.Data): Promise<ICreateJwtTokenAdapter.Result>;
};
export namespace ICreateJwtTokenAdapter {
  export type Data = {
    subject: string;
    expires: number;
    type: 'access' | 'refresh';
  };
  export type Result = string | null;
}
