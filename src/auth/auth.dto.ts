import { ApiProperty } from '@nestjs/swagger';

export class GetTokenByApplications {
  @ApiProperty({ example: 'code' })
  code: string;
}
