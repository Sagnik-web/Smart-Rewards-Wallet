const jwt = require("jsonwebtoken");
const User = require("../Model/User");

exports.authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        error: "Missing auth header"
      });
    }

    const token = header.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({
        error: "Invalid token"
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
