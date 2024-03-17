const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const getHomepage = async (req, res) => {
  try {
    const posts = await Post.find();
    for (const post of posts) {
      post.comments = await Comment.find({ post: post._id });
    }
    res.render("index", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const postNewMsg = (req, res) => {
  const { name, message } = req.body;

  const newPost = new Post({ name: name, message: message });
  newPost
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err.message);
      res.send(err.message);
    });
};

const postComment = (req, res) => {
  const { postId, message } = req.body;
  const newComment = new Comment({ message: message, post: postId });

  newComment
    .save()
    .then((comment) => {
      // Update the corresponding post to include the comment's ID
      return Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment._id } },
        { new: true }
      );
    })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err.message);
      res.send(err.message);
    });
};

// Add validation middleware for a form submission
exports.validateFormData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  getHomepage,
  postNewMsg,
  postComment,
};
