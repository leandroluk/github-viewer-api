import { Controller, Headers, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { IRefreshTokenCase } from '#/domain';
import { AuthorizationResponseObject } from '#/presentation/response-objects';
import { IDecodeTokenTask, IRefreshTokenTask } from '#/presentation/tasks';

@ApiTags('auth')
@Controller('api/auth/refresh')
export class RefreshTokenController implements IRefreshTokenCase {
  constructor(
    @Inject('IDecodeTokenTask')
    private readonly decodeTokenTask: IDecodeTokenTask,
    @Inject('IRefreshTokenTask')
    private readonly refreshTokenTask: IRefreshTokenTask,
  ) {}

  @ApiBearerAuth('JWT')
  @Post()
  @ApiOkResponse({ description: 'Ok', type: AuthorizationResponseObject })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async verify(@Headers() headers: IRefreshTokenCase.Headers): Promise<IRefreshTokenCase.Result> {
    const decoded = await this.decodeTokenTask.decode(headers);
    if (decoded?.type === 'refresh') {
      const authorization = await this.refreshTokenTask.refresh(decoded);
      if (authorization) {
        return authorization;
      }
    }
    throw new UnauthorizedException();
  }
}
