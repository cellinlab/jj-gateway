import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'jwt-secret',
  expiresIn: '15s',
  ignoreExpiration: true,
};

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

