import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty({
    example: 'xxx'
  })
  id?: string;

  @ApiProperty({
    example: 'username'
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'a@b.com'
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'nickname'
  })
  @IsNotEmpty()
  username: string;
}
