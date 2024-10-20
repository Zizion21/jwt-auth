namespace NodeJS {
    interface ProcessEnv {
        // App
        PORT: number
        HOST: string

        // Database
        DB_PORT: number
        DB_HOST: string
        DB_USERNAME: string
        DB_PASSWORD: string
        DB_NAME: string

        // JWT
        ACCESS_TOKEN_SECRET: string
        REFRESH_TOKEN_SECRET: string
    }
}