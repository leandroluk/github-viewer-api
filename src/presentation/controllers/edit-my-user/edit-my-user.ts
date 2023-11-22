import {
  Body,
  ConflictException,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { IEditMyUserCase } from '#/domain';
import { MESSAGE_EMAIL_IN_USE } from '#/presentation/constants';
import { EditMyUserBodyDTO } from '#/presentation/dtos';
import {
  IDecodeTokenTask,
  IEditUserTask,
  IGetUserByEmailTask,
  IRefreshUserGithubByUserTask,
} from '#/presentation/tasks';

@ApiTags('my')
@Controller('my')
export class EditMyUserController implements IEditMyUserCase {
  constructor(
    @Inject('IDecodeTokenTask')
    private readonly decodeTokenTask: IDecodeTokenTask,
    @Inject('IGetUserByEmailTask')
    private readonly getUserByEmailTask: IGetUserByEmailTask,
    @Inject('IEditUserTask')
    private readonly editUserTask: IEditUserTask,
    @Inject('IRefreshUserGithubByUserTask')
    private readonly refreshUserGithubByUserTask: IRefreshUserGithubByUserTask,
  ) {}

  @ApiBearerAuth('JWT')
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Put()
  @HttpCode(HttpStatus.OK)
  async edit(@Headers() headers: IEditMyUserCase.Headers, @Body() body: EditMyUserBodyDTO): Promise<void> {
    const decoded = await this.decodeTokenTask.decode(headers);
    if (decoded?.type !== 'access') {
      throw new UnauthorizedException();
    }
    const user = await this.getUserByEmailTask.get(decoded);
    if (body.email) {
      const emailInUse = await this.getUserByEmailTask.get({ email: body.email! });
      if (emailInUse) {
        throw new ConflictException(MESSAGE_EMAIL_IN_USE);
      }
    }
    await Promise.all([
      this.refreshUserGithubByUserTask.refresh({ userId: user.id }),
      this.editUserTask.edit({ user, changes: body }),
    ]);
  }
}
