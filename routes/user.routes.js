const express = require("express");
const {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controllers.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
