const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Assuming decoded contains the user info
    next();
  } catch (ex) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authenticateToken;
