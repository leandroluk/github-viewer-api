import { ApiProperty } from '@nestjs/swagger';

class HealthDTOAuthor {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class HealthDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  version: string;

  @ApiProperty()
  homepage: string;

  @ApiProperty()
  author: HealthDTOAuthor;
}
