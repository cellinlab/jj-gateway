import { Controller, Get, Post, Body, Patch, Param, Delete, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { BizException } from 'src/common/exceptions/biz.exception.filter';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return `findAll version 1 and neutral(default)`
  }

  @Get()
  @Version(['2'])
  findAll_v2() {
    return `findAll_v2`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    throw new Error('findError');
  }

  @Get('findBizError')
  @Version([VERSION_NEUTRAL, '1'])
  findBizError() {
    throw new BizException('findBizError');
  }

  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }
}
