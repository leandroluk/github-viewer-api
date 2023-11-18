import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

import { ISignInCase } from '#/domain';

@JoiSchemaOptions({
  allowUnknown: true,
})
export class SignInBodyDTO implements ISignInCase.Body {
  @JoiSchema(Joi.string().required())
  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty({ example: 'Test@123' })
  password: string;
}
