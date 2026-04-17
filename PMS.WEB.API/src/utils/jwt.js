const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
