import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentation } from './common/helpers/swaggerDocumentation';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const documentation = new SwaggerDocumentation(app);
  documentation.build();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
