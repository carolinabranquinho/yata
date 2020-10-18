import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import UsersPage from "./pages/users/UsersPage";

function App() {
  return (
    <BrowserRouter>
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
      <Route path="/users" component={UsersPage} />
    </BrowserRouter>
  );
}

export default App;
