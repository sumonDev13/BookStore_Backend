import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  return res.status(234).send({ message: "welcome" });
});

mongoose
  .connect(
    "mongodb+srv://sumonmondalaiubcse:sumonDev13@cluster0.kgc4kb2.mongodb.net/"
  )
  .then(() => {
    console.log("database connected successfully");

    app.listen(port, () => {
      console.log(`server running to port : ${port}`);
    });
  })
  .catch(() => {
    console.log(`something wrong in database server`);
    console.log("error", error);
  });
