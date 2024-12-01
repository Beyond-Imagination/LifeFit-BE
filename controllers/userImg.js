const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../service/userService");

const uploadDir = "uploads/users/profile";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const userId = req.params.id;
    cb(null, `${userId}_profileImg${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const getProfileImage = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.profileImage) {
      return res.status(404).json({ error: "Profile image not found" });
    }
    //   res.status(200).sendFile(path.resolve(user.profileImage));
    res.status(200).json({ profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProfileImage = (req, res) => {
  upload.single("img")(req, res, async (err) => {
    if (err) {
      console.log("error 발생", err);
      return res.status(400).json({ error: err.message });
    }

    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.profileImage = req.file.path;
      await user.save();
      res.status(200).json({ message: "Profile image added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

const deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 프로필 이미지 삭제
    if (user.profileImage) {
      fs.unlinkSync(user.profileImage);
      user.profileImage = null;
      await user.save();
    }

    res.status(200).json({ message: "Profile image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfileImage, addProfileImage, deleteProfileImage };
