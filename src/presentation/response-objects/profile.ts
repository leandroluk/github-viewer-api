import { ApiProperty } from '@nestjs/swagger';

import { IGetMyProfileCase, IUserGithub } from '#/domain';

import { GithubUserResponseObject } from './github-user';

export class ProfileResponseObject implements IGetMyProfileCase.Result {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  id: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @ApiProperty({ type: GithubUserResponseObject })
  _github: Omit<IUserGithub, 'timestamp' | 'id' | 'userId'>;
}
