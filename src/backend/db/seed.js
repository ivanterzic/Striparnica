const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log(process.env.DATABASE_URL);
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const seed = fs.readFileSync(path.resolve(__dirname, 'seed.sql')).toString();

pool.query(seed, (error, result) => {
    if (error) {
        console.error('Failed to seed the database', error);
    } else {
        console.log('Database seeded successfully');
    }
}
);

pool.end();