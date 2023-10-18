import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    author: {
      type: "string",
      required: true,
    },

    title: {
      type: "string",
      required: true,
    },
    publishYear: {
      type: "Number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const book = mongoose.model("Book", bookSchema);
