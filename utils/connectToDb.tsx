import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/creWork");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB: ", error);
  }
};