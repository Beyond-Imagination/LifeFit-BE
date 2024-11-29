const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Create a new user
router.post("/", addUser);

// Get a user by ID
router.get("/:id", verifyToken, getUser);

// Update a user by ID
router.put("/:id", verifyToken, updateUser);

// Delete a user by ID
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
