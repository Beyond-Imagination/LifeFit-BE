const express = require("express");
const { Project } = require("../models/projects");
const { ProjectComment } = require("../models/project_comments");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const { lastId, size } = req.query; // 쿼리 파라미터에서 lastId와 size를 가져옴
  const limit = parseInt(size) || 10; // size가 없으면 기본값은 10
  const userId = req.user.id;
  try {
    let query = {};

    // lastId가 있다면, 해당 id보다 작은 데이터를 가져오도록 쿼리를 수정
    if (lastId) {
      query._id = { $lt: lastId };
    }

    // 데이터베이스 조회
    const projects = await Project.find(query)
      .sort({ _id: -1 }) // 최신순으로 정렬
      .limit(limit); // 요청된 크기만큼 제한

    const projectData = await Promise.all(
      projects.map(async (project) => {
        const commentCount = await ProjectComment.countDocuments({
          projectId: project._id,
        });

        return {
          id: project._id,
          title: project.title,
          date: project.createdAt.toISOString().split("T")[0], // YYYY-MM-DD 형식
          likes: project.likes.length,
          comments: commentCount,
          image:
            project.imageList.length > 0
              ? project.imageList[0]
              : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", // 첫 번째 이미지만 반환
          isLiked: project.likes.includes(userId),
        };
      }),
    );

    res.status(200).send(projectData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const commentData = await ProjectComment.find({ project: id })
      .sort({ _id: 1 })
      .limit(10)
      .populate("author");

    const comments = commentData.map((comment) => ({
      id: comment._id,
      user: comment.author.nickname,
      content: comment.content,
    }));

    res.status(200).send({
      id: project._id,
      title: project.title,
      date: project.createdAt.toISOString().split("T")[0],
      content: project.content,
      likes: project.likes.length,
      comments: comments,
      images: project.imageList,
      isLiked: project.likes.includes(userId),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

router.post("/:id/like", async function (req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const likesIndex = project.likes.indexOf(userId);

    if (likesIndex === -1) {
      // 좋아요 추가
      project.likes.push(userId);
    } else {
      // 좋아요 제거
      project.likes.splice(likesIndex, 1);
    }

    await project.save();

    res.status(200).send({
      projectId: project._id,
      likesCount: project.likes.length,
      isLiked: likesIndex === -1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to toggle like" });
  }
});

router.post("/:id/comment", async function (req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;
  const { content } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const comment = new ProjectComment({
      author: userId,
      project: id,
      content: content,
    });

    await comment.save();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to add comment" });
  }
});

module.exports = router;
