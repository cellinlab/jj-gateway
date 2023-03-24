import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule { }
