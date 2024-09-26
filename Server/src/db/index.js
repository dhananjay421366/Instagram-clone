import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected successfully !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`MONGODB connection FAILED ${error.message}`);
    process.exit(1); // Exit process with failure status
  }
};

export default connectDB;
