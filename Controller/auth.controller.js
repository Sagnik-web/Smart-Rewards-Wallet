const User = require("../Model/User");
const Wallet = require("../Model/Wallet");
const jwt = require("jsonwebtoken");
const status = require("../Constants/status.constants");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if(!name){
      return res.status(status.BAD_REQUEST.code).json({ ...status.BAD_REQUEST, message: "Name is required" });
    }

    if(!email){
      return res.status(status.BAD_REQUEST.code).json({ ...status.BAD_REQUEST, message: "Email is required" });
    }

    if(!password){
      return res.status(status.BAD_REQUEST.code).json({ ...status.BAD_REQUEST, message: "Password is required" });
    }

   
    const user = new User({ name, email, phone, password });
    await user.save();
   
    // create wallet
    const wallet = new Wallet({ userId: user._id, balance: 0 });
    await wallet.save();
   
    res.status(status.CREATED.code).json({ ...status.CREATED, message: "User created" });
  } catch (err) {
    next(err);
  }
};




exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if(!email){
      return res.status(status.BAD_REQUEST.code).json({ ...status.BAD_REQUEST, message: "Email is required" });
    }

    if (!password) {
      return res.status(status.BAD_REQUEST.code).json({ ...status.BAD_REQUEST, message: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(status.UNAUTHORIZED.code).json({ ...status.UNAUTHORIZED, message: "Invalid credentials" });
    
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) return res.status(status.UNAUTHORIZED.code).json({ ...status.UNAUTHORIZED, message: "Invalid credentials" });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.status(status.SUCCESS.code).json({ ...status.SUCCESS, token });

  } catch (err) {
    next(err);
  }
};
