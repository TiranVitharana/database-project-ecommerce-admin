export interface IDBSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export const GetDBSettings = (): IDBSettings => {
    const env = process.env.NODE_ENV;

    if (env === 'development') {
        return {
            host: process.env.DB_HOST!, // Using DB_HOST from .env
            port: 3306, // Assuming default MySQL port; adjust if necessary
            user: process.env.DB_USER!, // Using DB_USER from .env
            password: process.env.DB_PASSWORD!, // Using DB_PASSWORD from .env
            database: process.env.DB_NAME!, // Using DB_NAME from .env
        };
    } else {
        return {
            host: process.env.DB_HOST!, // Change to production DB_HOST if different
            port: 3306, // Assuming default MySQL port; adjust if necessary
            user: process.env.DB_USER!, // Change to production DB_USER if different
            password: process.env.DB_PASSWORD!, // Change to production DB_PASSWORD if different
            database: process.env.DB_NAME!, // Change to production DB_NAME if different
        };
    }
};
