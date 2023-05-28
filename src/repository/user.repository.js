const pool = require("../db");

async function getAllUsersInfoDB() {
  const client = await pool.connect();
  const sql = `select * from users_info join users on users.info_id = users_info.id`;
  const data = (await client.query(sql)).rows;

  return data;
}

async function createAllUsersInfoDB(birth, city, age, name, surname) {
  const client = await pool.connect();

  const sqlUsersInfo =
    "insert into users_info (birth, city, age) values ($1, $2, $3) returning *";
  const dataUsersInfo = (await client.query(sqlUsersInfo, [birth, city, age]))
    .rows;

  const sqlUsers =
    "insert into users ( name, surname, info_id) values ($1, $2, $3) returning *";
  const dataUsers = (
    await client.query(sqlUsers, [name, surname, dataUsersInfo[0].id])
  ).rows;

  return [{ ...dataUsersInfo[0], ...dataUsers[0] }];
}

module.exports = { getAllUsersInfoDB, createAllUsersInfoDB };
