export type ICreateHashAdapter = {
  create(plain: string): Promise<string>;
};
