const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resettoken", resetPassword);

module.exports = router;
