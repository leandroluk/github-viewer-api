import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { IAuthorization, ISignInCase } from '#/domain';
import { SignInBodyDTO } from '#/presentation/dtos';
import { AuthorizationResponseObject } from '#/presentation/response-objects';
import { IAuthorizeUserTask, IGetUserByEmailTask } from '#/presentation/tasks';

@ApiTags('auth')
@Controller('api/auth/sign-in')
export class SignInController implements ISignInCase {
  constructor(
    @Inject('IGetUserByEmailTask')
    private readonly getUserByEmailTask: IGetUserByEmailTask,
    @Inject('IAuthorizeUserTask')
    private readonly authorizeUserTask: IAuthorizeUserTask,
  ) {}

  @ApiOkResponse({ type: AuthorizationResponseObject, description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInBodyDTO): Promise<IAuthorization> {
    const user = await this.getUserByEmailTask.get(body);
    if (user && !user.removedAt) {
      const authorization = await this.authorizeUserTask.authorize({
        user,
        password: body.password,
      });
      if (authorization) {
        return authorization;
      }
    }
    throw new UnauthorizedException();
  }
}
