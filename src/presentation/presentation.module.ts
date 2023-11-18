import { Module } from '@nestjs/common';

import { DataModule } from '#/data';

import * as controllers from './controllers';

@Module({
  imports: [DataModule],
  controllers: Object.values(controllers),
})
export class PresentationModule {}
