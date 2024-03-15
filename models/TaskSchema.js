const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["pending", "completed", "inProgress"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const Tasks = mongoose.model("Task", taskSchema);

module.exports = Tasks;
