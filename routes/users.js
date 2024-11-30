const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// Create a new user
router.post("/", addUser);

// Get a user by ID
router.get("/:id", verifyToken, getUser);

// Update a user by ID
router.put("/:id", verifyToken, updateUser);

// Delete a user by ID
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
