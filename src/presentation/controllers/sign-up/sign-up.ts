import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

import { ISignUpCase } from '#/domain';
import { MESSAGE_EMAIL_IN_USE, MESSAGE_GITHUB_USER_NOT_FOUND } from '#/presentation/constants';
import { SignUpBodyDTO } from '#/presentation/dtos';
import { IAddUserTask, IGetGithubUserTask, IGetUserByEmailTask } from '#/presentation/tasks';

@ApiTags('auth')
@Controller('auth/sign-up')
export class SignUpController implements ISignUpCase {
  constructor(
    @Inject('IGetUserByEmailTask')
    private readonly getUserByEmailTask: IGetUserByEmailTask,
    @Inject('IGetGithubUserTask')
    private readonly getGithubUserTask: IGetGithubUserTask,
    @Inject('IAddUserTask')
    private readonly addUserTask: IAddUserTask,
  ) {}

  @ApiCreatedResponse({ description: 'Created' })
  @ApiConflictResponse({ description: 'Conflit' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpBodyDTO): Promise<void> {
    const [emailInUse, githubUser] = await Promise.all([
      this.getUserByEmailTask.get(body),
      this.getGithubUserTask.get(body._github),
    ]);
    if (emailInUse) {
      throw new ConflictException(MESSAGE_EMAIL_IN_USE);
    }
    if (!githubUser) {
      throw new ForbiddenException(MESSAGE_GITHUB_USER_NOT_FOUND);
    }
    await this.addUserTask.add({
      user: body,
      githubUser,
    });
  }
}
