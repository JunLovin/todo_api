import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const createPool = () => {
    const newPool = new pg.Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
        ssl: {
            rejectUnauthorized: false
        },
        application_name: 'todo_api',
        max: 10, 
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
        maxUses: 7500,
    })
    return newPool
}

export const pool = createPool()