import { INestApplication } from "@nestjs/common";
import {BaseDocumentation} from "../classes/BaseDocumentation";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerDocumentation extends BaseDocumentation {
  constructor(app: INestApplication) { super(app) }
  public async build(): Promise<void> {
    const options = new DocumentBuilder() // Crear una instancia de Plataforma Swagger y configurarla
    .setTitle('Auth App')
    .setDescription('Documentation for hospital management app')
    .setVersion('1.0')
    .setTermsOfService('http://example.com/terms')
    .setLicense('MIT', 'http://example.com/license')
    .addServer('http://localhost:3000')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup('api', this.app, document);
  }
}