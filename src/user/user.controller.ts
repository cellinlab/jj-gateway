import { Controller, Post, Body, Query, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { AddUserDto } from './user.dto';


@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @ApiOperation({ summary: '添加用户' })
  @Version([VERSION_NEUTRAL, '1'])
  @Post('/add')
  create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }
}
