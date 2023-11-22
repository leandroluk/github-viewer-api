import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

import { IEditMyUserCase } from '#/domain';
import { PASSWORD_REGEX } from '../constants';

@JoiSchemaOptions({
  allowUnknown: true,
})
export class EditMyUserBodyDTO implements IEditMyUserCase.Body {
  @JoiSchema(Joi.string().email({ tlds: { allow: true } }))
  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @JoiSchema(Joi.string().min(8).pattern(PASSWORD_REGEX))
  @ApiProperty({ example: 'Test@123' })
  password: string;
}
