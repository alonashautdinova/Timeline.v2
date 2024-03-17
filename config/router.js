const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator"); // Import express-validator functions
const controller = require("../controllers/controllers");
const apiEndPoint = require("../controllers/apiEndpointControllers");

//routed for views
router.get("/", controller.getHomepage);
router.post("/post", controller.postNewMsg);
router.post("/comment", controller.postComment);

// routes for API Endpoints
router.post("/api/post", apiEndPoint.createPost);
router.get("/api/posts", apiEndPoint.getAllPosts);
router.put("/api/post/:id", apiEndPoint.updatePost);
router.delete("/api/post/:id", apiEndPoint.deletePost);

module.exports = router;
