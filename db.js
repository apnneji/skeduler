const { Pool } = require("pg");
require('dotenv').config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("connect", async (client) => {
  await client.query("SET TIME ZONE 'Asia/Manila'");
});

const schema = process.env.DB_SCHEMA;
const checkDatabaseConnection = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Database connection successful!');
        return true;
    } catch (err) {
        console.error('Database connection failed:', err.message);
        return false;
    }
};

module.exports = { pool, schema, checkDatabaseConnection };