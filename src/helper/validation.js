const ExceptionType = require("../exception/exception");

function isValidUserId(req, res, next) {
  const { id } = req.params;

  if (isNaN(id)) throw new Error(ExceptionType.FIELD_IS_NOT_VALID);
  if (id < 0) throw new Error(ExceptionType.FIELD_IS_NOT_VALID);

  next();
}

function isValidUserBody(req, res, next) {
  const { birth, city, age, name, surname } = req.body;

  if (!birth) throw new Error(ExceptionType.FIELD_IS_EMPTY);
  if (!city) throw new Error(ExceptionType.FIELD_IS_EMPTY);
  if (!age) throw new Error(ExceptionType.FIELD_IS_EMPTY);
  if (!name) throw new Error(ExceptionType.FIELD_IS_EMPTY);
  if (!surname) throw new Error(ExceptionType.FIELD_IS_EMPTY);

  if (!isNaN(city)) throw new Error(ExceptionType.FIELD_IS_NOT_VALID);
  if (!isNaN(name)) throw new Error(ExceptionType.FIELD_IS_NOT_VALID);
  if (!isNaN(surname)) throw new Error(ExceptionType.FIELD_IS_NOT_VALID);
  if (!/^[0-9]{2,2}\-[0-9]{2,2}\-[0-9]{2,2}$/gm.test(birth))
    throw new Error(ExceptionType.FIELD_IS_NOT_VALID);

  next();
}

module.exports = { isValidUserId, isValidUserBody };
