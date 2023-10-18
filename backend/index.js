import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/book.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));

// api routes

app.get("/", (req, res) => {
  return res.status(234).send({ message: "welcome" });
});

app.post('/books', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
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
