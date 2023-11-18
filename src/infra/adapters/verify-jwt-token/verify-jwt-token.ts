import { Injectable } from '@nestjs/common';
import jsonwebtoken, { JwtPayload, VerifyOptions } from 'jsonwebtoken';

import { IVerifyJwtTokenAdapter } from '#/data';
import { vars } from '#/vars';

@Injectable()
export class VerifyJwtTokenAdapter implements IVerifyJwtTokenAdapter {
  async verify(data: IVerifyJwtTokenAdapter.Data): Promise<IVerifyJwtTokenAdapter.Result> {
    const { sub: subjectBase64 } = jsonwebtoken.verify(data.token, vars.jwt.publicKey, {
      algorithms: [vars.jwt.algorithm] as VerifyOptions['algorithms'],
      issuer: vars.jwt.issuer,
      audience: vars.jwt.audience,
    }) as JwtPayload;
    // convert content to utf8 (minimal decrypting)
    const subjectWithSalt = Buffer.from(subjectBase64!, 'hex').toString('utf8');
    // remove salt from real subject
    const [type, subject] = subjectWithSalt.split('/')!;
    return {
      subject,
      type,
    } as IVerifyJwtTokenAdapter.Result;
  }
}
