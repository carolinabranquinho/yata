import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import UsersPage from "./pages/users/UsersPage";
import TasksList from "./pages/tasks/UserTasksPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UsersPage} />
        <Route path="/users/:id/tasks" component={TasksList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
