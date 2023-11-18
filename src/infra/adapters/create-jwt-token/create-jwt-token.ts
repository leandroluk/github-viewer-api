import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';

import { ICreateJwtTokenAdapter } from '#/data';
import { vars } from '#/vars';

@Injectable()
export class CreateJwtTokenAdapter implements ICreateJwtTokenAdapter {
  async create(data: ICreateJwtTokenAdapter.Data): Promise<string> {
    // add random string in end of subject
    const subjectWithSalt = `${data.type}/${data.subject}/${crypto.randomBytes(8).toString('hex')}`;
    // convert to base64 (minimal encrypting)
    const subjectBase64 = Buffer.from(subjectWithSalt, 'utf8').toString('hex');
    // create jwt token
    const jwtToken = jsonwebtoken.sign({}, vars.jwt.privateKey, {
      algorithm: vars.jwt.algorithm as SignOptions['algorithm'],
      issuer: vars.jwt.issuer,
      audience: vars.jwt.audience,
      subject: subjectBase64,
      expiresIn: data.expires,
    });
    return jwtToken;
  }
}
