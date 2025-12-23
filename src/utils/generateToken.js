import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
      password: user.password,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export default generateToken;
