const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Schema = mongoose.Schema;
const PORT = process.env.PORT || 8008;
var app = Express();
app.use(Express.json());
app.use(cors());

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("CONNECTED")
);

const UserSchema = new Schema({
  name: String,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

const TaskSchema = new Schema({
  description: String,
  state: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const TasksModel = mongoose.model("Task", TaskSchema);

//users
// GET /users
app.get("/users", async (request, response) => {
  console.log("finding users");
  const users = await UserModel.find();
  console.log({ users });
  response.json(users.map((user) => ({ ...user._doc, id: user._id })));
});

// POST /users
app.post("/users", async (request, response) => {
  const newUser = new UserModel(request.body);
  const savedUser = await newUser.save();
  response.json({ ...savedUser._doc, id: savedUser._id });
});

//PATCH /users/:id
app.patch("/users/:id", async (request, response) => {
  const id = request.params.id;
  const updatedUser = await UserModel.update({ _id: id }, request.body);
  response.json({ ...updatedUser._doc, id: updatedUser._id });
});

// Delete /users/:id
app.delete("/users/:id", async (request, response) => {
  const id = request.params.id;
  await UserModel.deleteOne({ _id: id });
  response.sendStatus(200);
});

//tasks

app.post("/users/:id/tasks", async (request, response) => {
  const id = request.params.id;
  const task = await TasksModel.create({
    ...request.body,
    user: id,
    state: "to do",
  });
  await UserModel.findByIdAndUpdate(
    id,
    { $push: { tasks: task._id } },
    { new: true, useFindAndModify: false }
  );
  response.json({ ...task._doc, id: task._id });
});

//GET /users/:id/tasks
app.get("/users/:id/tasks", async (request, response) => {
  const id = request.params.id;
  const user = await UserModel.findOne({ _id: id }).populate("tasks");
  console.log(user);
  response.json(user.tasks.map((task) => ({ ...task._doc, id: task._id })));
});

// PATCH /users/:id/tasks/:taskId
app.patch("/users/:id/tasks/:taskId", async (request, response) => {
  const id = request.params.taskId;
  const updatedTask = await TasksModel.update({ _id: id }, request.body);
  response.json({ ...updatedTask._doc, id: updatedTask._id });
});

//DELETE /users/:id/tasks/:taskId
app.delete("/users/:id/tasks/:taskId", async (request, response) => {
  const id = request.params.id;
  const taskId = request.params.taskId;
  await TasksModel.deleteOne({ _id: taskId });
  response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening at :${PORT}`);
});
