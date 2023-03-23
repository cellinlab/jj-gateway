import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

import {
  getAppToken,
  getUserAccessToken,
  getUserToken,
  refreshUserToken,
} from '@/helper/feishu/auth';
import { BizException } from '@/common/exceptions/biz.exception.filter';
import { messages } from '@/helper/feishu/message';
import { getUserTokenDto } from './feishu.dto';
import { BIZ_ERROR_CODE } from '@/common/exceptions/biz.error.codes';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY
  private USER_TOKEN_CACHE_KEY
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
    this.USER_TOKEN_CACHE_KEY = this.configService.get('USER_TOKEN_CACHE_KEY');
  }

  async getAppToken() {
    let appToken: string;
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    if (!appToken) {
      const response = await getAppToken();
      if (response.code === 0) {
        appToken = response.app_access_token;
        this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, {
          ttl: response.expire - 60, // 提前一分钟过期
        });
      } else {
        throw new BizException('飞书获取 app_token 失败');
      }
    }
    return appToken;
  }

  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken();
    const res = await messages(receive_id_type, params, app_token as string);
    return res;
  }

  async getUserToken(code: string) {
    const app_token = await this.getAppToken();
    const dto: getUserTokenDto = {
      code,
      app_token,
    };

    const res: any = await getUserToken(dto);
    if (res.code !== 0) {
      throw new BizException('飞书获取 user_token 失败');
    }
    return res.data;
  }

  async setUserCacheToken(tokenInfo: any) {
    const {
      refresh_token,
      access_token,
      user_id,
      expires_in,
      refresh_expires_in,
    } = tokenInfo;

    await this.cacheManager.set(
      `${this.USER_TOKEN_CACHE_KEY}:${user_id}`,
      access_token,
      {
        ttl: expires_in - 60,
      },
    );

    await this.cacheManager.set(
      `${this.USER_TOKEN_CACHE_KEY}:refresh:${user_id}`,
      refresh_token,
      {
        ttl: refresh_expires_in - 60,
      },
    );
  }

  async getUserCacheToken(user_id: string) {
    let userToken: string = await this.cacheManager.get(
      `${this.USER_TOKEN_CACHE_KEY}:${user_id}`,
    );
    if (!userToken) {
      const refreshToken: string = await this.cacheManager.get(
        `${this.USER_TOKEN_CACHE_KEY}:refresh:${user_id}`,
      );
      if (!refreshToken) {
        throw new BizException({
          code: BIZ_ERROR_CODE.TOKEN_INVALID,
          message: '飞书用户 token 已过期',
        });
      } else {
        const userTokenInfo = await this.getUserTokenByRefreshToken(refreshToken);
        await this.setUserCacheToken(userTokenInfo);
        userToken = userTokenInfo.access_token;
      }
    }
    return userToken;
  }

  async getUserTokenByRefreshToken(refreshToken: any) {
    return await refreshUserToken({
      refresh_token: refreshToken,
      app_token: await this.getAppToken(),
    });
  }
}
