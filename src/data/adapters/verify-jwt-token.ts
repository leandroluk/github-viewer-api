export type IVerifyJwtTokenAdapter = {
  verify(token: IVerifyJwtTokenAdapter.Data): Promise<IVerifyJwtTokenAdapter.Result>;
};
export namespace IVerifyJwtTokenAdapter {
  export type Data = {
    token: string;
  };
  export type Result = {
    subject: string;
    type: 'access' | 'refresh';
  };
}
