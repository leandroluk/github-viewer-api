import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

import { ISignInCase } from '#/domain';

@JoiSchemaOptions({
  allowUnknown: true,
})
export class SignInDTO implements ISignInCase.Body {
  @ApiProperty({ example: 'john.doe@email.com' })
  @JoiSchema(Joi.string().required())
  email: string;

  @ApiProperty({ example: 'Test@123' })
  @JoiSchema(Joi.string().required())
  password: string;
}
