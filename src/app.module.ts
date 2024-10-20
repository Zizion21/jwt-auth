import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env")
    }),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
