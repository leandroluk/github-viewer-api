import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { IGetGithubUserCase } from '#/domain';
import { GithubUserParamsLoginDTO } from '#/presentation/dtos';
import { GithubUserResponseObject } from '#/presentation/response-objects/github-user';
import { IDecodeTokenTask, IGetGithubUserTask } from '#/presentation/tasks';

@ApiTags('github')
@Controller('api/github/:login')
export class GetGithubUserController implements IGetGithubUserCase {
  constructor(
    @Inject('IDecodeTokenTask')
    private readonly decodeTokenTask: IDecodeTokenTask,
    @Inject('IGetGithubUserTask')
    private readonly getGithubUserTask: IGetGithubUserTask,
  ) {}

  @ApiBearerAuth('JWT')
  @ApiOkResponse({ description: 'Ok', type: GithubUserResponseObject })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async get(
    @Headers() headers: IGetGithubUserCase.Headers,
    @Param() params: GithubUserParamsLoginDTO,
  ): Promise<IGetGithubUserCase.Result> {
    const decoded = await this.decodeTokenTask.decode(headers);
    if (decoded?.type !== 'access') {
      throw new UnauthorizedException();
    }
    const githubUser = await this.getGithubUserTask.get(params);
    if (!githubUser) {
      throw new NotFoundException('User not Found');
    }
    return githubUser;
  }
}
