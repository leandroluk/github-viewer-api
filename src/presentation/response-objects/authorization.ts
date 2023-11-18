import { IAuthorization } from '#/domain';
import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthorizationResponseObject implements IAuthorization {
  @ApiResponseProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
  @ApiResponseProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;
}
