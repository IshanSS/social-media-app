const express = require("express");
const router = express.Router();
const { createPost, getAllPosts } = require("../controllers/postController");
const auth = require("../middleware/auth");

router.post("/posts", auth, createPost);

router.get("/allPosts", getAllPosts);

module.exports = router;
