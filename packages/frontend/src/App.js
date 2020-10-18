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
        <Route exact={true} path="/">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                YATA
              </a>
            </header>
          </div>
        </Route>
        <Route exact path="/users" component={UsersPage} />
        <Route path="/users/:id/tasks" component={TasksList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
