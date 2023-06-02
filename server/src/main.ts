import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ErrorValidationPipe } from "./pipes/error.validation.pipe";

async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule, { cors: true });
    
    const config = new DocumentBuilder()
      .setTitle('Web service for animal shelters')
      .setDescription('Documentation for REST API')
      .setVersion('1.0.0')
      .addTag('Tatiana Dumarevskaya')
      .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    // app.useGlobalPipes(new ErrorValidationPipe());

    await app.listen(PORT, () => (console.log(`Server started on port: ${PORT}`)));
  } catch(e) {
    console.log(e);
  }
}

start();