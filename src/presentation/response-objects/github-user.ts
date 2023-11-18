import { IGithubUser } from '#/domain';
import { ApiProperty } from '@nestjs/swagger';

export class GithubUserResponseObject implements IGithubUser {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe' })
  login: string;

  @ApiProperty({ example: 123 })
  followersCount: number;

  @ApiProperty({ example: 123 })
  followingCount: number;

  @ApiProperty({ example: 123 })
  publicReposCount: number;

  @ApiProperty({ example: 'Loren ipsum dolor' })
  bio: string;

  @ApiProperty({ example: 'john.doe@email.com' })
  email: string;

  @ApiProperty({ example: 'john.doe.twitter' })
  twitterUsername: string;

  @ApiProperty({ example: 'John Doe Company' })
  company: string;

  @ApiProperty({ example: 'http://john.doe.com' })
  blogUrl: string;
}
