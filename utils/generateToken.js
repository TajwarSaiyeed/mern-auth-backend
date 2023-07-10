const jwt = require("jsonwebtoken");

const generateToken = (res, userId, email) => {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // save token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    domain: "mern-auth-tajwar.vercel.app",
  });
};

module.exports = generateToken;
