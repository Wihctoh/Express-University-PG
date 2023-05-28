const { Pool } = require("pg");

const pool = new Pool({
  password: "12345678",
  port: "5432",
  host: "localhost",
  database: "university",
  user: "postgres",
});

module.exports = pool;
