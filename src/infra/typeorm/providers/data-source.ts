import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { vars } from '#/vars';

import * as entities from '../entities';

export const dataSourceProvider: FactoryProvider = {
  provide: 'TypeORMDataSource',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      url: vars.db.postgres,
      synchronize: false,
      logging: vars.env !== 'production',
      entities: Object.values(entities),
    });

    return await dataSource.initialize();
  },
};
