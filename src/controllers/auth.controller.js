import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// register
export const register = async (req, res) => {
  try {
    const { name, email, password, accountType } = req.body;

    if (!name || !email || !password || !accountType)
      return res.status(400).json({ message: " All fields required" });

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: " User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      accountType,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ token: generateToken(newUser) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    res.json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
