import { Body, ConflictException, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { ISignUpCase } from '#/domain';
import { MESSAGE_EMAIL_IN_USE } from '#/presentation/constants';
import { SignUpBodyDTO } from '#/presentation/dtos';
import { IAddUserTask, IGetUserByEmailTask } from '#/presentation/tasks';

@ApiTags('auth')
@Controller('auth/sign-up')
export class SignUpController implements ISignUpCase {
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
      throw new ConflictException(MESSAGE_EMAIL_IN_USE);
    }
    await this.addUserTask.add(body);
  }
}
