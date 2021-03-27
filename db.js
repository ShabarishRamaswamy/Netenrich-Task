const Pool = require("pg").Pool;

const pool = new Pool({
    user: "admin",
    password: "abcd",
    database: "online_store",
    host: "localhost",
    port: 5432
});

module.exports = pool;