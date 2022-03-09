const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  // owner will be added later on
});

module.exports = model("Project", projectSchema);
