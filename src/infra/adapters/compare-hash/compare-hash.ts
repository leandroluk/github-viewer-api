import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

import { ICompareHashAdapter } from '#/data';

@Injectable()
export class CompareHashAdapter implements ICompareHashAdapter {
  async compare(data: ICompareHashAdapter.Data): Promise<boolean> {
    const iv = data.hashed.slice(0, 16);
    const toCompare = data.hashed.slice(16);
    const comparer = crypto.createHmac('sha256', iv).update(data.plain).digest('hex');
    return comparer === toCompare;
  }
}
