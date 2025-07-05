const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(400).json({ message: "Not token provided" });
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user = decode;
    next();
  } catch (err) {
    console.log("invalid token", err);
    return res.status(403).json({ message: "invalid token" });
  }
};

module.exports = { authenticate };
