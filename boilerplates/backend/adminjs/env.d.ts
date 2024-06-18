import { string } from "yup"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_DIALECT: string
            DATABASE_NAME: string
            DATABASE_HOST: string
            DATABASE_USER: string
            DATABASE_PASSWORD: string
            COOKIE_SECRET: string
            PORT: string;
            SPOTIFY_ACCESS_TOKEN: string;
            ACCESS_TOKEN: string;
            LOCAL_BASE_URL: string;
            REMOTE_BASE_URL: string;
        }
    }
}

export { };