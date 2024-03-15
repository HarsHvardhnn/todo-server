const userModel = require("../models/UserSchema");
const Tasks = require("../models/TaskSchema");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password) {
    if (!username) {
      res.send("username not found");
    }
    if (!email) {
      res.send("email not found");
    }
    if (!password) {
      res.send("password not found");
    }
    return;
  }
  try {
    await userModel.create({
      username: username,
      email: email,
      password: password,
    });

    res
      .send("user created successfully with details", username, password, email)
      .status(200);
  } catch (err) {
    console.log("here", err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await userModel.findOne({ username: username });

    if (!user) {
      return res.status(400).send("User does not exist");
    }

    if (password === user.password) {
      return res.status(200).send("User successfully logged in");
    } else {
      return res.status(401).send("Incorrect password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const addTask = async (req, res) => {
  const { username } = req.params;
  const { name, description } = req.body;
  try {
    const user = await userModel.findOne({ username: username });
    if (!user) {
      res.send("user not found");
      return;
    }

    console.log(user);

    const newTask = await Tasks.create({
      name: name,
      description: description,
      user: user._id,
    });

    user.tasks.push(newTask._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const showAllTasks = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    const user = await userModel.findOne({ username: username });
    if (!user) {
      res.send("user not found");
      return;
    }

    const tasks = await Tasks.find({ user: user._id });
    res.send(tasks);
  } catch (err) {
    console.log(err);
    res.send("internal server error");
  }
};

const deleteTasks = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await Tasks.findOneAndDelete({ _id: id });
    res.send("task deleted successfully").status(200);
  } catch (err) {
    res.send(err).status(500);
  }
};

const updateTasks = async (req, res) => {
  const { id, name, description, status } = req.body;
  try {
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: id },
      { $set: { name, description, status } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send("No task found with this id");
    }

    res.status(200).send("Task updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { signup, addTask, showAllTasks, login, updateTasks ,deleteTasks };
