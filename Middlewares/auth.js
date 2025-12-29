const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const status = require('../Constants/status.constants');

exports.authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({...status.UNAUTHORIZED, message: 'Missing auth header' });

    const token = header.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);

    if (!user) return res.status(401).json({ ...status.UNAUTHORIZED, message : 'Invalid token' });
    req.user = user;
    
    next();
  } catch (err) {
    next(err);
  }
};
