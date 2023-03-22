import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { getConfig } from './utils';

@Module({
  imports: [
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
