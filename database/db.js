import mongoose from "mongoose";

export const connection = async (name,pass) => {
  const URL = 'mongodb+srv://sumonmondalaiubcse:sumonDev13@cluster0.kgc4kb2.mongodb.net/';
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.log(`something wrong in database server`);
    console.log("error", error);
  }
};

export default connection;