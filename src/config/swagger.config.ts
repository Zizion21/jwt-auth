import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function SwaggerConfig(app: INestApplication): void {
    const doc = new DocumentBuilder()
        .setTitle("Code Challenge - JWT Authentication and Authorization")
        .setDescription("This is the 'JWT Auth' challenge developed by Zeinab Jafari")
        .setVersion("0.0.1")
        .addBearerAuth(swaggerAuthConfig(), "Authorization")
        .build()

    const swaggerDoc = SwaggerModule.createDocument(app, doc);
    SwaggerModule.setup("/api", app, swaggerDoc);
}

function swaggerAuthConfig(): SecuritySchemeObject {
    return {
        type: "http",
        bearerFormat: "JWT",
        in: "header",
        scheme: "bearer"
    }
}