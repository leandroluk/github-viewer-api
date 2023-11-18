import { Controller, Get, Headers, HttpCode, HttpStatus, Inject, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { IGetMyProfileCase } from '#/domain';
import { IDecodeTokenTask, IGetUserByEmailTask, IGetUserGithubByUserTask } from '#/presentation/tasks';

@ApiTags('my')
@Controller('api/my/profile')
export class GetMyProfileController implements IGetMyProfileCase {
  constructor(
    @Inject('IDecodeTokenTask')
    private readonly decodeTokenTask: IDecodeTokenTask,
    @Inject('IGetUserByEmailTask')
    private readonly getUserByEmailTask: IGetUserByEmailTask,
    @Inject('IGetUserGithubByUserTask')
    private readonly getUserGithubByUserTask: IGetUserGithubByUserTask,
  ) {}

  @ApiBearerAuth('JWT')
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Headers() headers: IGetMyProfileCase.Headers): Promise<IGetMyProfileCase.Result> {
    const decoded = await this.decodeTokenTask.decode(headers);
    if (decoded?.type === 'access') {
      const user = await this.getUserByEmailTask.get(decoded);
      const github = await this.getUserGithubByUserTask.get({ userId: user.id });
      return {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
        _github: {
          bio: github.bio,
          blogUrl: github.blogUrl,
          company: github.company,
          email: github.email,
          followersCount: github.followersCount,
          followingCount: github.followingCount,
          login: github.login,
          name: github.name,
          publicReposCount: github.publicReposCount,
          twitterUsername: github.twitterUsername,
        },
      };
    }
    throw new UnauthorizedException();
  }
}
