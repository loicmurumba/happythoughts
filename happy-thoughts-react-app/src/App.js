import React from "react";
import logo from "./logo.png";
import { Button } from "@material-ui/core";
import "./App.css";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Switch from '@material-ui/core/Switch';

class App extends React.Component {
  state = {
    send_me_links: true,
    enable_morning_motivation: true,
    enable_sleep_reminder: true,
    morning_motivation_time: null,
    sleep_reminder_time: null,
  }
  handle_enable_morning_motivation = () => {
    var current_state = this.state;
    current_state.enable_morning_motivation = !current_state.enable_morning_motivation;
    this.setState(current_state);
    console.log(this.state);
  };
  handle_enable_sleep_reminder = () => {
    var current_state = this.state;
    current_state.enable_sleep_reminder = !current_state.enable_sleep_reminder;
    this.setState(current_state);
    console.log(this.state);
  };
  handle_morning_motivation_time = (new_time) => {
    var current_state = this.state;
    current_state.morning_motivation_time = new_time;
    this.setState(current_state);
    console.log(this.state);
  };
  handle_sleep_reminder_time = (new_time) => {
    var current_state = this.state;
    current_state.sleep_reminder_time = new_time;
    this.setState(current_state);
    console.log(this.state);
  };

  constructor(){
    super();
    const tokens = require("./tokens.json");
    this.firebaseConfig = {
      apiKey: tokens.fbasekey,
      authDomain: "happythoughts.firebaseapp.com",
      databaseURL: "https://happythoughts.firebaseio.com",
      projectId: "happythoughts",
      storageBucket: "happythoughts.appspot.com",
      messagingSenderId: "49951684871",
      appId: "1:49951684871:web:6a775f7666dac586deeda2",
      measurementId: "G-MED6KQVRYE"
    };
    this.firebase = require("firebase/app");
    this.firebase.initializeApp(this.firebaseConfig);
    require("firebase/database");
  }

  render(){
    return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          <div>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={this.state.morning_motivation_time}
              onChange={this.handle_morning_motivation_time}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
            <Switch onChange={this.handle_enable_morning_motivation}/>
          </div>
          <div>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={this.state.sleep_reminder_time}
              onChange={this.handle_sleep_reminder_time}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
            <Switch onChange={this.handle_enable_sleep_reminder}/>
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.handle_click}>
              Submit
            </Button>
          </div>
        </div>
    </div>
    </MuiPickersUtilsProvider>
    );
  };

  handle_click = () => {
    console.log(this.state);
    this.firebase
      .database()
      .ref("/")
      .set({
        "morning": this.state.morning_motivation_time.getTime(),
        "reminder": this.state.sleep_reminder_time.getTime()
      });

    //send 2 firebase.
  };


}

export default App;
