const Pool = require("pg").Pool;

const pool = new Pool({
    user: "shabarish",
    password: "abcd",
    database: "online_store",
    host: "localhost",
    port: 5432
});

module.exports = pool;