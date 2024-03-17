const Post = require("../models/Post");

const postController = {
  createPost: async (req, res) => {
    try {
      const { name, message } = req.body;
      const newPost = new Post({ name, message });
      await newPost.save();
      res.status(201).json({
        success: true,
        message: "Post created successfully",
        Post: newPost,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error: "Error with the post creation" });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Failed to fetch posts" });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { postId, name, message } = req.body;
      if (!postId) {
        return res
          .status(400)
          .json({ success: false, error: "No Post ID provided" });
      }
      const post = await Post.findById(postId);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }
      post.name = name || post.name;
      post.message = message || post.message;

      await post.save();

      res.json({ success: true, message: "Post updated successfully", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }
      res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error: "Falied to delete the post" });
    }
  },
};
module.exports = postController;
