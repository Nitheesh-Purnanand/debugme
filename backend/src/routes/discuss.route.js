import express from "express";
import Post from "../models/post.model.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a post
router.post("/", requireAuth, async (req, res) => {
  try {
    const post = new Post({ content: req.body.content, user: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "fullname").sort({ createdAt: -1 });
  res.json(posts);
});

// Like a post
router.post("/:id/like", requireAuth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (!post.likes.includes(req.user._id)) {
    post.likes.push(req.user._id);
    await post.save();
  }

  res.json({ likes: post.likes.length });
});

export default router;
