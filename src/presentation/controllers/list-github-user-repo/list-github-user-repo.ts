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

import { IListGithubUserRepoCase } from '#/domain';
import { GithubUserParamsLoginDTO } from '#/presentation/dtos';
import { IDecodeTokenTask, IListGithubUserReposByLoginTask } from '#/presentation/tasks';

@ApiTags('github')
@Controller('api/github/:login/repo/_list')
export class ListGithubUserRepoController implements IListGithubUserRepoCase {
  constructor(
    @Inject('IDecodeTokenTask')
    private readonly decodeTokenTask: IDecodeTokenTask,
    @Inject('IListGithubUserReposByLoginTask')
    private readonly listGithubUserReposByLoginTask: IListGithubUserReposByLoginTask,
  ) {}

  @ApiBearerAuth('JWT')
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async find(
    @Headers() headers: IListGithubUserRepoCase.Headers,
    @Param() params: GithubUserParamsLoginDTO,
  ): Promise<IListGithubUserRepoCase.Result> {
    const decoded = await this.decodeTokenTask.decode(headers);
    if (decoded?.type !== 'access') {
      throw new UnauthorizedException();
    }
    const repos = await this.listGithubUserReposByLoginTask.list(params);
    if (!repos) {
      throw new NotFoundException();
    }
    return repos;
  }
}
