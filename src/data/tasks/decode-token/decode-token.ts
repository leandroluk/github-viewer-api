import { Inject, Injectable } from '@nestjs/common';

import { IVerifyJwtTokenAdapter } from '#/data/adapters';
import { IDecodeTokenTask } from '#/presentation/tasks';

@Injectable()
export class DecodeTokenTask implements IDecodeTokenTask {
  constructor(
    @Inject('IVerifyJwtTokenAdapter')
    private readonly verifyJwtTokenAdapter: IVerifyJwtTokenAdapter,
  ) {}

  async decode(headers: IDecodeTokenTask.Headers): Promise<IDecodeTokenTask.Result> {
    const { authorization = '' } = headers;
    const [, token] = authorization.split(' ');
    const result = await this.verifyJwtTokenAdapter.verify({ token });
    if (!result) return null;
    return {
      salt: result.salt,
      email: result.subject,
      type: result.type,
    };
  }
}
