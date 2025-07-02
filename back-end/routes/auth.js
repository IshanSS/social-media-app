const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);
router.post("/logout", auth, logoutUser);

module.exports = router;
