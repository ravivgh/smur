const express = require("express");
const {
  register,
  login,
  getProfile,
  logout,
  fileUpload,
} = require("../controller/auth");
const upload = require("../middleware/upload");
const { authenticate } = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { loginSchema, registerSchema } = require("../validation/validation");
const router = express.Router();

router.post("/register", validationMiddleware(registerSchema), register);
router.post("/login", validationMiddleware(loginSchema), login);
router.post("/image", upload.single("file"), fileUpload);
router.get("/profile", authenticate, getProfile);
router.post("/logout", logout);
module.exports = { router };
