import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

import { IGithubUser } from '#/domain';

@JoiSchemaOptions({
  allowUnknown: true,
})
export class GithubUserParamsLoginDTO implements Pick<IGithubUser, 'login'> {
  @JoiSchema(Joi.string().required())
  @ApiProperty({ example: 'john.doe' })
  login: string;
}
