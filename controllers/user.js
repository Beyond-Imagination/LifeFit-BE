const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../service/userService");
const { Project } = require("../models/projects");
const { ProjectComment } = require("../models/project_comments");

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
    const { currentPassword, ...updateData } = req.body;
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

const getCommentedProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. 댓글에서 해당 유저가 작성한 댓글을 찾기
    const comments = await ProjectComment.find({ author: userId }).populate(
      "project",
    );

    // 2. 프로젝트 리스트 구성
    const projects = comments
      .map((comment) => comment.project) // 댓글이 달린 프로젝트 정보
      .filter(
        (project, index, self) =>
          project &&
          self.findIndex((p) => p._id.toString() === project._id.toString()) ===
            index, // 중복 제거
      )
      .map((project) => ({
        id: project._id,
        title: project.title,
        likes: project.likes.length,
        createdAt: project.createdAt,
      }));

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching commented projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching commented projects",
    });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getLikedProjects,
  getCommentedProjects,
};
