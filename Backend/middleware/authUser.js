const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;
require("dotenv").config();

// Generate a JWT
function generateToken(user) {
  const payload = { id: user.id, email: user.email }; // Include both id and email
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token valid for 1 hour
}

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Typical Bearer token
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Token not provided");
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({
        message: err.message.includes("expired")
          ? "Token expired"
          : "Invalid token",
      });
    }

    // console.log("Decoded Token Payload:", decoded); // debug
    req.user = decoded; // Attach decoded payload to request it contains user id and email (payload data)
    next();
  });
}

module.exports = { generateToken, authenticateToken };
