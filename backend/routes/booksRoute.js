import { Book } from "../models/book.js";
import express from "express";
const router = express.Router();

// create a new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
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
// get all published books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//get single book
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// update a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "fill all required fields: title, author, publishYear",
      });
    }
    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
