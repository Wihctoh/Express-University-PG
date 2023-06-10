const express = require("express");
const buildResponse = require("../helper/buildResponse");
const {
  getAllUsersInfo,
  createAllUsersInfo,
  getUsersById,
  deleteUser,
} = require("../service/user.service");
const { isValidUserId, isValidUserBody } = require("../helper/validation");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAllUsersInfo();

    buildResponse(send, 200, data);
  } catch (error) {
    buildResponse(send, 404, error.message);
  }
});

router.post("/", isValidUserBody, async (req, res) => {
  try {
    const { birth, city, age, name, surname } = req.body;
    const data = await createAllUsersInfo(birth, city, age, name, surname);

    buildResponse(send, 200, data);
  } catch (error) {
    buildResponse(send, 404, error.message);
  }
});

router.get("/:id", isValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUsersById(id);

    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", isValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);

    res.status(200).send(data);
  } catch (error) {
    buildResponse(send, 404, error.message);
  }
});

module.exports = router;
