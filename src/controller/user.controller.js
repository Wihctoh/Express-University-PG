const express = require("express");
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

    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", isValidUserBody, async (req, res) => {
  try {
    const { birth, city, age, name, surname } = req.body;
    const data = await createAllUsersInfo(birth, city, age, name, surname);

    res.status(200).send(data);
  } catch (error) {
    res.status(405).send(error.message);
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
    res.status(404).send(error.message);
  }
});

module.exports = router;
