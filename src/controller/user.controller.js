const express = require("express");
const buildResponse = require("../helper/buildResponse");
const {
  getAllUsersInfo,
  createAllUsersInfo,
} = require("../service/user.service");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAllUsersInfo();

    buildResponse(send, 200, data);
  } catch (error) {
    buildResponse(send, 404, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { birth, city, age, name, surname } = req.body;
    const data = await createAllUsersInfo(birth, city, age, name, surname);

    buildResponse(send, 200, data);
  } catch (error) {
    buildResponse(send, 404, error.message);
  }
});

module.exports = router;
