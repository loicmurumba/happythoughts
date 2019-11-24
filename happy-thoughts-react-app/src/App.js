import React from "react";
import logo from "./logo.png";
import "./App.css";
import Form from "./Form.js";

function App() {
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-light">
        <a class="navbar-brand" href="#">
          <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Settings
              </a>
            </li>
          </ul>
          <span class="navbar-text">Signed in as Lauren</span>
        </div>
      </nav>
      <div className="App-body">
        <Form />
      </div>
    </div>
  );
}

export default App;
