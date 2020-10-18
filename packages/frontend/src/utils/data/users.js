let users = [
  {
    id: 1,
    name: "Tania",
    tasks: [
      { id: 1, description: "test", state: "done" },
      { id: 2, description: "study", state: "to do" },
      { id: 3, description: "bla", state: "to do" },
    ],
  },
  {
    id: 2,
    name: "Craig",
    tasks: [{ id: 1, description: "bla", state: "to do" }],
  },
  {
    id: 3,
    name: "Ben",
    tasks: [
      { id: 1, description: "test", state: "to do" },
      { id: 2, description: "study bla", state: "to do" },
      { id: 3, description: "blabla", state: "to do" },
    ],
  },
];

export async function listUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 750);
  });
}

export async function deleteUser(id) {
  console.log(`removing user ${id}`);
  users = users.filter((user) => user.id !== id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 750);
  });
}

export async function updateUser(editedUser) {
  const user = users.find((user) => user.id === editedUser.id);
  console.log("Updating user: " + editedUser.id);
  user.name = editedUser.name;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 750);
  });
}

export async function createUser(user) {
  const id = users.length + 1;
  const newUser = { id, ...user };
  users = [...users, newUser];
  console.log("User created: " + user.name);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newUser);
    }, 750);
  });
}

export async function getUserTasks(id) {
  const user = users.find((user) => user.id.toString() === id.toString());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user.tasks);
    }, 750);
  });
}

export async function deleteUserTask(userId, id) {
  const user = users.find((user) => user.id == userId);
  user.tasks = user.tasks.filter((task) => task.id != id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 750);
  });
}

export async function updateUserTask(userId, editedTask) {
  const user = users.find((user) => user.id == userId);
  user.tasks = user.tasks.map((task) =>
    task.id == editedTask.id ? editedTask : task
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(editedTask);
    }, 750);
  });
}

export async function createUserTask(userId, task) {
  const user = users.find((user) => user.id == userId);
  const id = user.tasks.length + 1;
  const newTask = { id, ...task, state: "to do" };
  user.tasks = [...user.tasks, newTask];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newTask);
    }, 750);
  });
}

export async function completeUserTask(userId, completedTask) {
  const user = users.find((user) => user.id == userId);
  user.tasks = user.tasks.map((task) =>
    task.id == completedTask.id ? { ...task, state: "done" } : task
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...completedTask, state: "done" });
    }, 750);
  });
}
