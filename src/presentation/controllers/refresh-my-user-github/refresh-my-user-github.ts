import { Controller, Headers, Inject, Patch, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IRefreshMyUserGithubCase } from '#/domain';
import { IDecodeTokenTask, IGetUserByEmailTask, IRefreshUserGithubByUserTask } from '#/presentation/tasks';

@ApiTags('my')
@Controller('my/profile/github')
export class RefreshMyGithubProfileController implements IRefreshMyUserGithubCase {
  constructor(
    @Inject('IDecodeTokenTask')
    private readonly decodeTokenTask: IDecodeTokenTask,
    @Inject('IGetUserByEmailTask')
    private readonly getUserByEmailTask: IGetUserByEmailTask,
    @Inject('IRefreshUserGithubByUserTask')
    private readonly refreshUserGithubByUserTask: IRefreshUserGithubByUserTask,
  ) {}

  @ApiBearerAuth('JWT')
  @Patch()
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiServiceUnavailableResponse({ description: 'Service Unavailable' })
  async refresh(@Headers() headers: IRefreshMyUserGithubCase.Headers): Promise<void> {
    const decoded = await this.decodeTokenTask.decode(headers);
    if (decoded?.type !== 'access') {
      throw new UnauthorizedException();
    }
    const user = await this.getUserByEmailTask.get(decoded);
    const refreshed = await this.refreshUserGithubByUserTask.refresh({ userId: user.id });
    if (!refreshed) {
      throw new ServiceUnavailableException("Can't refresh user Github data");
    }
  }
}
