import { Body, ConflictException, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { ISignUpCase } from '#/domain';
import { SignUpBodyDTO } from '#/presentation/dtos';
import { IAddUserTask, IGetUserByEmailTask } from '#/presentation/tasks';

@ApiTags('auth')
@Controller('api/auth/sign-up')
export class SignUpController implements ISignUpCase {
  static readonly MESSAGE_EMAIL_IN_USE = 'Email already in use.';

  constructor(
    @Inject('IGetUserByEmailTask')
    private readonly getUserByEmailTask: IGetUserByEmailTask,
    @Inject('IAddUserTask')
    private readonly addUserTask: IAddUserTask,
  ) {}

  @ApiCreatedResponse({ description: 'Created' })
  @ApiConflictResponse({ description: 'Conflit' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpBodyDTO): Promise<void> {
    const emailInUse = await this.getUserByEmailTask.get(body);
    if (emailInUse) {
      throw new ConflictException(SignUpController.MESSAGE_EMAIL_IN_USE);
    }
    await this.addUserTask.add(body);
  }
}
