const {
  getAllUsersInfoDB,
  createAllUsersInfoDB,
} = require("../repository/user.repository");

async function getAllUsersInfo() {
  const data = await getAllUsersInfoDB();

  if (!data.length) throw new Error("no data!");

  return data;
}

async function createAllUsersInfo(birth, city, age, name, surname) {
  const data = await createAllUsersInfoDB(birth, city, age, name, surname);

  if (!data.length) throw new Error("obj not created! ");

  return data;
}

module.exports = { getAllUsersInfo, createAllUsersInfo };
