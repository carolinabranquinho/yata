import React, { useState } from "react";
import "../pages.css";
import UsersTable from "../../components/ResourceTable";
import {
  listUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../../utils/data/users";
import Loading from "../../components/Loading";

function useListUsers() {
  const [loading, setLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState([]);

  React.useEffect(() => {
    listUsers().then((responseUsers) => {
      setLoadedUsers(responseUsers);
      setLoading(false);
    });
  }, []);

  return { users: loadedUsers, loading };
}

function UsersPage() {
  const { users: loadedUsers, loading } = useListUsers();

  const [users, setUsers] = useState([]);
  React.useEffect(() => {
    if (!loading) {
      setUsers(loadedUsers);
    }
  }, [loading, loadedUsers]);

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    deleteUser(id);
  };

  const editUser = (editedUser) => {
    const user = users.find((user) => user.id === editedUser.id);
    user.name = editedUser.name;
    updateUser(editedUser);
  };

  const addUser = (user) => {
    const id = users.length + 1;
    setUsers([...users, { id, ...user }]);
    createUser(user).then((createdUser) => {
      setUsers([...users, createdUser]);
    });
  };

  const getResourceLink = (user) => `/users/${user.id}/tasks`;

  return (
    <div className="container">
      <h1>YATA - Users List</h1>
      {loading ? (
        <Loading />
      ) : (
        <UsersTable
          resources={users}
          onDelete={removeUser}
          onUpdate={editUser}
          onCreate={addUser}
          getResourceLink={getResourceLink}
          attributes={["name"]}
        />
      )}
    </div>
  );
}

export default UsersPage;
