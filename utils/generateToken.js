const jwt = require("jsonwebtoken");

const generateToken = (res, userId, email) => {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const secureCookie = process.env.NODE_ENV === "production";
  const sameSiteCookie = secureCookie ? "none" : "strict";

  // save token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: sameSiteCookie,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports = generateToken;
