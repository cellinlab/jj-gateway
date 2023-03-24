import {
  Controller,
  UseGuards,
  Res,
  Get,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { FeishuAuthGuard } from './guards/feishu-auth.guard';
import { AuthService } from './auth.service';
import { GetTokenByApplications } from './auth.dto';
import { Public } from './constants';
import { PayloadUser } from '@/helper';

@ApiTags('用户认证')
@Controller({
  path: 'auth',
  version: [VERSION_NEUTRAL],
})
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @ApiOperation({
    summary: 'Feishu 授权登录',
    description: 'Feishu 授权登录',
  })
  @UseGuards(FeishuAuthGuard)
  @Public()
  @Get('/feishu/auth2')
  async getFeishuTokenByApplications(
    @PayloadUser() user: Payload,
    @Res({ passthrough: true }) res: FastifyReply,
    @Query() query: GetTokenByApplications,
  ) {
    const { access_token } = await this.authService.login(user);
    res.setCookie('jwt', access_token, {
      path: '/',
    });
    return access_token;
  }

  @ApiOperation({
    summary: '解析 token',
    description: '解析 token',
  })
  @Get('/token/info')
  async getTokenInfo(@PayloadUser() user: Payload) {
    return user;
  }
}
