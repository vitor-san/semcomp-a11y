const Mongoose = require("mongoose");

const RiddlethonQuestionSchema = Mongoose.Schema(
  {
    index: {
      type: Number,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    clue: {
      type: String,
    },
    answer: {
      type: String,
      required: true,
    },
    isLegendary: {
      type: Mongoose.Schema.Types.Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "riddlethon-question" }
);

module.exports = Mongoose.model(
  "riddlethon-question",
  RiddlethonQuestionSchema
);