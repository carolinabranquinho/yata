import React, { useState } from "react";
import "./UsersPage.css";
import UserTable from "../../components/UserTable/UserTable";

function UsersPage() {
  const usersData = [
    { id: 1, name: "Tania" },
    { id: 2, name: "Craig" },
    { id: 3, name: "Ben" },
  ];

  const [users, setUsers] = useState(usersData);
  //const [editing, setEditing] = useState(false);
  //const [currentUser, setCurrentUser] = useState(initialFormState);
  const initialFormState = { id: null, name: "" };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  /*
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };
  */

  return (
    <div className="container">
      <h1>Users Page</h1>
      <UserTable users={users} deleteUser={deleteUser} />
      <button className="add">Add User</button>
    </div>
  );
}

export default UsersPage;
