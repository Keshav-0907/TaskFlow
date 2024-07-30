import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MOGNO_URL as string);
  } catch (error) {
    console.error("Error connecting to DB: ", error);
  }
};