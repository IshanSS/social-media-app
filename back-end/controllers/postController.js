const Post = require("../models/post");
const uploadOnCloudinary = require("../utils/cloudinary");

/*
    @route POST /api/posts
    @decs Create a new post
    @access Private
*/
const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    let imageUrl = null;

    if (req.file) {
      const imageResponse = await uploadOnCloudinary(req.file.path);
      imageUrl = imageResponse.secure_url;
    }

    const post = new Post({
      user: req.user.id,
      title,
      content,
      image: imageUrl, // Ensure image is included here
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

/*
    @route GET /api/posts/user
    @decs Get posts created by the current user
    @access Private
*/
const getUserPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    // Fetch posts created by the current user with pagination and sort by creation date (descending)
    const posts = await Post.find({ user: req.user.id })
      .populate("user", "name email") // Populate the user's name and email
      .sort({ createdAt: -1 }) // Most recent first
      .skip((page - 1) * limit) // Skip the posts of previous pages
      .limit(parseInt(limit)); // Limit the number of posts per page

    // Get total number of posts for pagination
    const total = await Post.countDocuments({ user: req.user.id });

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

module.exports = { createPost, getAllPosts, getUserPosts };
