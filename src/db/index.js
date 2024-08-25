import mongoose from "mongoose";
import dotenv from "dotenv";
import { dbName } from "../constants.js";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = `${process.env.MONGODB_URI}/${dbName}`;
    console.log("Connecting to:", mongoURI);

    const connectResponse = await mongoose.connect(mongoURI);
    console.log(`Connected: ${connectResponse.connection.host}`);
  } catch (err) {
    console.log("Error occurred ", err);
    process.exit(1);
  }
};

export default connectDB;
