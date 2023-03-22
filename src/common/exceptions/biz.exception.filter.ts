import { HttpException, HttpStatus } from '@nestjs/common';
import { BIZ_ERROR_CODE } from './biz.error.codes';

type BizError = {
  code: number;
  message: string;
};

export class BizException extends HttpException {
  constructor(err: BizError | string) {
    if (typeof err === 'string') {
      err = {
        code: BIZ_ERROR_CODE.COMMON,
        message: err,
      }
    }
    super(err, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BizException({
      code: BIZ_ERROR_CODE.ACCESS_FORBIDDEN,
      message: 'Access Forbidden',
    });
  }
}
