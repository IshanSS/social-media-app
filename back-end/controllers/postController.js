const Post = require("../models/post");

/*
    @route POST /api/posts
    @decs Create a new post
    @access Private
*/
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const image = req.body.image || null; // Handle image as optional

  if (!title || !content) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const post = new Post({
      user: req.user.id,
      title,
      content,
      image, // Ensure image is included here
    });

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

/*
    @route GET /api/posts
    @decs Get all posts
    @access Public
*/
const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    // Fetch posts with pagination and sort by creation date (descending)
    const posts = await Post.find()
      .populate("user", "name email") // Populate the user's name and email
      .sort({ createdAt: -1 }) // Most recent first
      .skip((page - 1) * limit) // Skip the posts of previous pages
      .limit(parseInt(limit)); // Limit the number of posts per page

    // Get total number of posts for pagination
    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = { createPost, getAllPosts };
