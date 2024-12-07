const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getUserPosts,
} = require("../controllers/postController");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

router.post("/posts", auth, upload.single("image"), createPost);

router.get("/allPosts", getAllPosts);

// Add new route for getting user posts
router.get("/posts/user", auth, getUserPosts);

module.exports = router;
