function buildResponse(res, code, message) {
  res.status(code).send(message);
}

module.exports = buildResponse;