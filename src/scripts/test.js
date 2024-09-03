const pgp = require('pg-promise')({
    // Initialization options
});

const db = pgp({
    host: 'strapi-properties-listing.c524k8guo6m9.me-central-1.rds.amazonaws.com',
    port: 5432,
    database: 'strapi',
    user: 'postgres',
    password: 'postgres',
    ssl: { rejectUnauthorized: false }  // Add SSL settings
});

async function testConnection() {
    try {
        const result = await db.one('SELECT NOW()');
        console.log('Connection successful! Current time from database:', result.now);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    } finally {
        pgp.end();
    }
}

testConnection();
