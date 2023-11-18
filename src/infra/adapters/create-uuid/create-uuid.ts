import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

import { ICreateUuidAdapter } from '#/data';

@Injectable()
export class CreateUuidAdapter implements ICreateUuidAdapter {
  async create(): Promise<`${string}-${string}-${string}-${string}-${string}`> {
    return crypto.randomUUID();
  }
}
