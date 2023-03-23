import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { getConfig } from './utils';

const REDIS_CONFIG = getConfig('REDIS_CONFIG');

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: REDIS_CONFIG.host,
      port: REDIS_CONFIG.port,
      auth_pass: REDIS_CONFIG.auth,
      db: REDIS_CONFIG.db,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true, // ignore .env file
      isGlobal: true, // make config available everywhere
      load: [getConfig] // load config from yaml file
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
