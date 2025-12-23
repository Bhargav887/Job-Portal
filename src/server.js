import connectDB from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const { PORT } = process.env;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};
start();
