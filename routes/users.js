const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  getProfileImage,
  addProfileImage,
  deleteProfileImage,
} = require("../controllers/userImg");

// Create a new user
router.post("/", addUser);

// Get a user by ID
router.get("/:id", verifyToken, getUser);

// Update a user by ID
router.put("/:id", verifyToken, updateUser);

// Delete a user by ID
router.delete("/:id", verifyToken, deleteUser);

router.get("/:id/img", verifyToken, getProfileImage);
router.put("/:id/img", verifyToken, addProfileImage);

// router.delete("/:id/img", deleteProfileImage);

router.post("/up", addProfileImage);

module.exports = router;
