const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../model/schema");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    return res.status(200).json({ message: "User created" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "User Not created" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 86400000,
      })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (err) {
    console.log("Login Failed", err);
    return res.status(400).json({ message: "Login Failed " });
  }
};
const fileUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      path: `/upload/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(400)
      .json({ message: "File upload failed", error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) return res.status(200).json({ message: "User  found" });
    res.json({ user });
  } catch (err) {
    return res.status(400).json({ message: "User not found" });
  }
};
const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
module.exports = { register, login, getProfile, logout, fileUpload };
