import mongoose from "mongoose";

 const connection = async (username,password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.kgc4kb2.mongodb.net/?retryWrites=true&w=majority`;
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