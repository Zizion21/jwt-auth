import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function TypeOrmConfig(): TypeOrmModuleOptions {
    const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
    return {
        type: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        database: DB_NAME,
        password: DB_PASSWORD,
        autoLoadEntities: false,
        synchronize: false,
        entities: [
            "dist/**/**/**/*.entity{.ts,.js}",
            "dist/**/**/*.entity{.ts,.js}",
        ]
    }
}