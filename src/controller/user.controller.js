const express = require("express");
const {
  getAllUsersInfo,
  createAllUsersInfo,
} = require("../service/user.service");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAllUsersInfo();

    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { birth, city, age, name, surname } = req.body;
    const data = await createAllUsersInfo(birth, city, age, name, surname);

    res.status(200).send(data);
  } catch (error) {
    res.status(405).send(error.message);
  }
});

module.exports = router;
