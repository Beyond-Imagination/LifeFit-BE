const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../service/userService");
const { Project } = require("../models/projects");

const addUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { currentPassword, updateData } = req.body;
    const user = await updateUserById(
      req.params.id,
      currentPassword,
      updateData,
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const user = await deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLikedProjects = async (req, res) => {
  const { userId } = req.user.id;

  try {
    // 좋아요 배열에 userId가 포함된 프로젝트 검색
    const likedProjects = await Project.find({ likes: userId });

    res.status(200).json(
      likedProjects.map((project) => {
        return {
          id: project._id,
          title: project.title,
          likes: project.likes.length,
          createdAt: project.createdAt,
        };
      }),
    );
  } catch (error) {
    console.error("Error fetching liked projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching liked projects",
    });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getLikedProjects,
};
