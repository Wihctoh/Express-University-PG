const {
  getAllUsersInfoDB,
  createAllUsersInfoDB,
  getUsersByIdDB,
  deleteUserDB,
} = require("../repository/user.repository");
const ExceptionType = require("../exception/exception");

async function getAllUsersInfo() {
  const data = await getAllUsersInfoDB();

  if (!data.length) throw new Error(ExceptionType.DB_USER_GET);

  return data;
}

async function getUsersById(id) {
  const data = await getUsersByIdDB(id);
  if (!data.length) throw new Error(ExceptionType.DB_USER_GET_BY_ID);

  return data;
}

async function createAllUsersInfo(birth, city, age, name, surname) {
  const data = await createAllUsersInfoDB(birth, city, age, name, surname);

  if (!data.length) throw new Error(ExceptionType.DB_USER_CREATE);

  return data;
}

async function deleteUser(id) {
  const data = await deleteUserDB(id);

  return data;
}

module.exports = {
  getAllUsersInfo,
  createAllUsersInfo,
  getUsersById,
  deleteUser,
};
