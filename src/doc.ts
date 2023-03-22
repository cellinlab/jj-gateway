import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as pkgConfig from '../package.json';

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle(pkgConfig.name)
    .setDescription(pkgConfig.description)
    .setVersion(pkgConfig.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/doc', app, document); // http://localhost:3000/api/doc
}
