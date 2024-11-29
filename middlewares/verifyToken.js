const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({ error: "Token is required" });
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token is invalid" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
