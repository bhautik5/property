import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if database is already connected then dont connect again
  if (connected) {
    console.log("Database is already connected...");
    return;
  }

  // connect to DB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("DB connected");
    return;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
