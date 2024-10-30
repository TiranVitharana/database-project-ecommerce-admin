// lib/db.ts
import mysql from 'mysql2/promise';

export async function createDBConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}