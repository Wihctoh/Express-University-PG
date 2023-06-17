const { Pool } = require("pg");

const pool = new Pool({
  password: process.env.PWD,
  port: process.env.PORT_DB,
  host: process.env.HOST,
  database: process.env.DB,
  user: process.env.USER,
});

module.exports = pool;
