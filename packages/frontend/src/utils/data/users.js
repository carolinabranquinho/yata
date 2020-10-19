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

const API_URL = "http://localhost:8008";

export async function listUsers() {
  return fetch(`${API_URL}/users`).then((response) => response.json());
}

export async function deleteUser(id) {
  return fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

export async function updateUser(editedUser) {
  return fetch(`${API_URL}/users/${editedUser.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedUser),
  }).then((response) => response.json());
}

export async function createUser(user) {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

export async function getUserTasks(id) {
  return fetch(`${API_URL}/users/${id}/tasks`).then((response) =>
    response.json()
  );
}

export async function deleteUserTask(userId, id) {
  return fetch(`${API_URL}/users/${userId}/tasks/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

export async function updateUserTask(userId, editedTask) {
  return fetch(`${API_URL}/users/${userId}/tasks/${editedTask.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedTask),
  }).then((response) => response.json());
}

export async function createUserTask(userId, task) {
  return fetch(`${API_URL}/users/${userId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => response.json());
}

export async function completeUserTask(userId, completedTask) {
  return updateUserTask(userId, { ...completedTask, state: "done" });
}
