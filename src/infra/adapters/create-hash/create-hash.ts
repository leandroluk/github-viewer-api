import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

import { ICreateHashAdapter } from '#/data';

@Injectable()
export class CreateHashAdapter implements ICreateHashAdapter {
  async create(plain: string): Promise<string> {
    const iv = crypto.randomBytes(8).toString('hex');
    const hashed = crypto.createHmac('sha256', iv).update(plain).digest('hex');
    return `${iv}${hashed}`;
  }
}
