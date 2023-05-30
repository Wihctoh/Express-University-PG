const pool = require("../db");
const ExceptionType = require("../exception/exception");

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

  if (!dataUsersInfo.length) throw new Error(ExceptionType.DB_USER_CREATE);

  const sqlUsers =
    "insert into users ( name, surname, info_id) values ($1, $2, $3) returning *";
  const dataUsers = (
    await client.query(sqlUsers, [name, surname, dataUsersInfo[0].id])
  ).rows;

  return [{ ...dataUsersInfo[0], ...dataUsers[0] }];
}

async function getUsersByIdDB(id) {
  const client = await pool.connect();

  const sql =
    "select * from users_info join users on users.info_id = users_info.id where users.info_id = $1";
  const data = (await client.query(sql, [id])).rows;

  return data;
}

async function deleteUserDB(id) {
  const client = await pool.connect();

  const deleteSql1 = "delete from users where info_id = $1 returning *";
  const data1 = (await client.query(deleteSql1, [id])).rows;

  if (!data1.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID);

  const deleteSql2 = "delete from users_info where id = $1 returning *";
  const data2 = (await client.query(deleteSql2, [id])).rows;

  return [{ ...data1[0], ...data2[0] }];
}

module.exports = {
  getAllUsersInfoDB,
  createAllUsersInfoDB,
  getUsersByIdDB,
  deleteUserDB,
};
