const express = require("express");
const router = express.Router();
const { loginUser } = require("../service/userService");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json([{ id: 1, username: "daisy" }]);
});

router.post("/join", function (req, res) {
  res.json({ message: "join" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
