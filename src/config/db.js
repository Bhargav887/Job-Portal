import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected");
  } catch (e) {
    console.error("Databased connection failed");
  }
};

export default connectDB;
