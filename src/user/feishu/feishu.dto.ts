import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

import { RECEIVE_TYPE, MSG_TYPE } from '@/helper/feishu/message';

export class FeishuMessageDto {
  @IsNotEmpty()
  @IsEnum(RECEIVE_TYPE)
  @ApiProperty({ example: 'email', enum: RECEIVE_TYPE })
  receive_id_type: RECEIVE_TYPE

  @IsNotEmpty()
  @ApiProperty({ example: 'cellinlab@cellinlab.com' })
  receive_id?: string

  @IsNotEmpty()
  @ApiProperty({ example: '{\"text\":\"hello world\"}' })
  content?: string

  @IsNotEmpty()
  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: keyof MSG_TYPE
}

export class getUserTokenDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'code', description: '飞书临时凭证' })
  code: string;

  app_token: string;
}

export class FeishuUserInfo {
  accessToken?: string;
  email: string;
  avatarUrl: string;
  avatarThumb: string;
  avatarBig: string;
  avatarMiddle: string;
  mobile: string;
  enName: string;
  name: string;
  feishuUserId: string;
  feishuUnionId: string;
}
