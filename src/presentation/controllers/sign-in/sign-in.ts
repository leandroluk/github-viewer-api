import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { IAuthorization, ISignInCase } from '#/domain';
import { SignInDTO } from '#/presentation/dtos';
import { AuthorizationResponseObject } from '#/presentation/response-objects';
import { IAuthorizeUserTask, IGetUserByEmailTask } from '#/presentation/tasks';

@ApiTags('auth')
@Controller('api/auth/sign-in')
export class SignInController implements ISignInCase {
  constructor(
    @Inject('IGetUserByEmailTask')
    private readonly getUserByEmail: IGetUserByEmailTask,
    @Inject('IAuthorizeUserTask')
    private readonly authorizeUser: IAuthorizeUserTask,
  ) {}

  @ApiOkResponse({ type: AuthorizationResponseObject })
  @Post()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDTO): Promise<IAuthorization> {
    const user = await this.getUserByEmail.get(body);
    if (user) {
      const authorization = await this.authorizeUser.authorize({
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
