const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: { type: String },
  date: { type: Date },
  type: { type: String },
});

module.exports = mongoose.model("Message", messageSchema);
