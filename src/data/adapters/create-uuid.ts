export type ICreateUuidAdapter = {
  create(): Promise<`${string}-${string}-${string}-${string}-${string}`>;
};
