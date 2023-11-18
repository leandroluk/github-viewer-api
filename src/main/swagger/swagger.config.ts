import { vars } from '#/vars';
import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle(vars.app.name)
  .setDescription(vars.app.description)
  .setVersion(vars.app.version)
  .setExternalDoc('External docs', vars.app.homepage)
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT',
  )
  .build();
