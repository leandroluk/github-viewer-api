import { IAuthorizedHeaders } from '#/domain';

export type IDecodeTokenTask = {
  decode(headers: IDecodeTokenTask.Headers): Promise<IDecodeTokenTask.Result>;
};
export namespace IDecodeTokenTask {
  export type Headers = IAuthorizedHeaders;
  export type Result = {
    type: 'access' | 'refresh';
    email: string;
    salt: string;
  } | null;
}
