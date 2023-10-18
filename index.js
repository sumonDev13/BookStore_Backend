import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  return res.status(234).send({ message: "welcome" });
});

// database connection

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.kgc4kb2.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server running to port : ${port}`);
    });
  } catch (error) {
    console.log(`something wrong in database server`);
    console.log("error", error);
  }
};

connection(username, password);
