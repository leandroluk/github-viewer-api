import { Module, Provider } from '@nestjs/common';

import * as _providers from './providers';

const providers: Provider[] = Object.values(_providers);

@Module({
  providers,
  exports: providers,
})
export class TypeORMModule {}
