const jwt = require("jsonwebtoken");
const User = require("../models/user");



const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token from 'Bearer <token>'
  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
    req.user = await User.findById(decoded.id).select('-password');  // Exclude password
    next();
  } catch (err) {
    console.log("Token verification error:", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
