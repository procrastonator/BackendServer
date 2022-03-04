const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const goalSchema = new Schema({
  title: String,
  description: String,
  isDone: {
    enum: [flase, true],
    default: false
  },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
});

module.exports = model("Goal", goalSchema);
