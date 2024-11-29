const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Create a new user
const createUser = async (userData) => {
  const { email, nickname, password, profileImage } = userData;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    nickname,
    password: hashedPassword,
    profileImage,
  });
  return await user.save();
};

// 로그인 메서드
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    // "secret",
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: user.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.password;
      },
    }),
  };
};

// Read a user by ID
const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

// Update a user by ID
const updateUserById = async (id, currentPassword, updateData) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  if (updateData.password) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(updateData.password, saltRounds);
  }

  return await User.findByIdAndUpdate(id, updateData, { new: true }).select(
    "-password"
  );
};

// Delete a user by ID
const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
};
