const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
