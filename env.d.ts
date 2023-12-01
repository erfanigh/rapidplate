declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TELEGRAM_TOKEN: string;
            SERVER_URL: string;
        }
    }
}

export { };