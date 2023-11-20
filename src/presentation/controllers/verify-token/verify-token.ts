import { Controller, Get, Headers, Inject, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { IVerifyTokenCase } from '#/domain';
import { IDecodeTokenTask } from '#/presentation/tasks';

@ApiTags('auth')
@Controller('auth/verify')
export class VerifyTokenController implements IVerifyTokenCase {
  constructor(
    @Inject('IDecodeTokenTask')
    private readonly decodeTokenTask: IDecodeTokenTask,
  ) {}

  @ApiBearerAuth('JWT')
  @Get()
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async verify(@Headers() headers: IVerifyTokenCase.Headers): Promise<void> {
    const decoded = await this.decodeTokenTask.decode(headers);
    if (decoded?.type !== 'access') {
      throw new UnauthorizedException();
    }
  }
}
