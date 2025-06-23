import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const configdatabase = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") configdatabase.ssl = true;

export const db = new Pool(configdatabase);
