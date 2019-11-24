import React from "react";
import logo from "./logo.png";
import { Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";
import TimeSliders from "./TimeSliders";
import CountSlider from "./CountSlider";

function App() {
  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  let morningUpdateState = false;

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
  require("firebase/database");

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const morningUpdate = () => {
    console.log(document.getElementById("customSwitch1").checked);
    morningUpdateState = document.getElementById("customSwitch1").checked;
  };

  const onClick = () => {
    console.log("submit");
    firebase
      .database()
      .ref("/")
      .set({
        type: "name",
        morning: "emailduple",
        sleep: "imageUrl",
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
        <TimeSliders name="Morning Motivation" lid="slide1"/>
        <TimeSliders name="Sleep Reminders" lid="slide2" />
        <CountSlider name="Occasional Memes" lid="count1" />
    
        
        <Button variant="contained" color="primary" onClick={onClick}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
