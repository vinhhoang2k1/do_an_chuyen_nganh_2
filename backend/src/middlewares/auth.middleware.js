const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Access denied'
      })
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

module.exports = {
  verifyToken
}