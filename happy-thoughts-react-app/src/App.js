import React from "react";
import logo from "./logo.png";
import { Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const tokens = require("./tokens.json");
  const firebaseConfig = {
    apiKey: tokens.fbasekey,
    authDomain: "happythoughts.firebaseapp.com",
    databaseURL: "https://happythoughts.firebaseio.com",
    projectId: "happythoughts",
    storageBucket: "happythoughts.appspot.com",
    messagingSenderId: "49951684871",
    appId: "1:49951684871:web:6a775f7666dac586deeda2",
    measurementId: "G-MED6KQVRYE"
};
  var firebase = require("firebase/app");
  firebase.initializeApp(firebaseConfig);
  require('firebase/database');

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const onClick = () => {
    console.log("submit");
    firebase.database().ref('/').set({
      type: "name",
      morning: "emailduple",
      sleep : "imageUrl",
      memes: "freq"
    });
  
    //send 2 firebase.

  };

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
              <a class="nav-link" href="#">
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
        <div class="row">
          <div class="col-md-10">
            <p className="header">Morning Motivation</p>
          </div>
          <div class="col-md-2">
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="customSwitch1" onInput="" />
              <label class="custom-control-label" for="customSwitch1" />
            </div>
          </div>
        </div>
        <div class="picker">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Select a time"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Button variant="contained" color="primary" onClick={onClick}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
