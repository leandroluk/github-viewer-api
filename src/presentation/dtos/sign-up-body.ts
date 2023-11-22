import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

import { ISignUpCase, IUserGithub } from '#/domain';
import { PASSWORD_REGEX } from '../constants';

class SignUpBodyDTOGithub implements Pick<IUserGithub, 'login'> {
  @ApiProperty({ example: 'example123' })
  login: string;
}

@JoiSchemaOptions({
  allowUnknown: true,
})
export class SignUpBodyDTO implements ISignUpCase.Body {
  @JoiSchema(
    Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
  )
  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @JoiSchema(Joi.string().min(8).pattern(PASSWORD_REGEX).required())
  @ApiProperty({ example: 'Test@123' })
  password: string;

  @JoiSchema(
    Joi.object<Pick<IUserGithub, 'login'>>({
      login: Joi.string().required(),
    }).required(),
  )
  @ApiProperty({ example: { login: 'example123' }, type: SignUpBodyDTOGithub })
  _github: Pick<IUserGithub, 'login'>;
}
