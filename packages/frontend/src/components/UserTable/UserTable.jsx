import React from "react";

const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Users Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user.id}>
            <th>{user.id}</th>
            <th>{user.name}</th>
            <th>
              <button className="up">update</button>
              <button
                onClick={() => props.deleteUser(user.id)}
                className="delete"
              >
                delete
              </button>
            </th>
          </tr>
        ))
      ) : (
        <tr>
          <td>No Users</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;
