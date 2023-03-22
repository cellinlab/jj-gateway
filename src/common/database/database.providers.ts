import { DataSource, DataSourceOptions } from 'typeorm';

const path = require('path');

import { getConfig } from '@/utils';

const databaseType: DataSourceOptions['type'] = 'mongodb';

const { MONGODB_CONFIG } = getConfig();

const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  type: databaseType,
  entities: [path.join(__dirname, `../../**/*.${MONGODB_CONFIG.entities}.entity{.ts,.js}`)],
};

const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);

export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      await MONGODB_DATA_SOURCE.initialize();
      return MONGODB_DATA_SOURCE;
    }
  }
];
