import React from "react";

import { Button } from "@material-ui/core";
import TimeSliders from "./TimeSliders";
import CountSlider from "./CountSlider";

class Form extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
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

    this.firebase = require("firebase/app");
    this.firebase.initializeApp(firebaseConfig);
    require("firebase/database");
  }

  handleSubmit(event) {
    let ans = {};

    // Links
    if (document.getElementById("inlineRadio1").checked) {
      ans.type = "links";
    } else {
      ans.type = "text";
    }

    if (document.getElementById("slide1").checked) {
      let val = document.getElementById("time1").value;
      val = val.substring(0, val.length - 3) + ":00";
      console.log(val);
      ans.morning = val;
    } else {
        ans.morning = null;
    }

    if (document.getElementById("slide2").checked) {
      let val = document.getElementById("time2").value;
      val = val.substring(0, val.length - 3) + ":00";
      console.log(val);
      ans.sleep = val;
    } else {
        ans.sleep = null;
    }

    if (document.getElementById("count1").checked) {
      let list = document.getElementsByTagName("input");
      let el = null;
      for (let i = 0; i < list.length; ++i) {
        if (list[i].type === "text") {
          el = list[i];
        }
      }
      console.log(el.value);
      ans.fun = el.value;
    } else {
        ans.fun = null;
    }

    this.firebase
      .database()
      .ref("/")
      .set(ans);
    console.log(ans);
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-md-11">
            <p className="header">Send Me</p>
          </div>
        </div>
        <div className="radio-buttons">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              checked="checked"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
            />
            <label class="form-check-label" for="inlineRadio1">
              Links
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label class="form-check-label" for="inlineRadio2">
              Text
            </label>
          </div>
        </div>
        <TimeSliders name="Morning Motivation" lid="slide1" cid="time1" />
        <TimeSliders name="Sleep Reminders" lid="slide2" cid="time2" />
        <CountSlider name="Occasional Memes" lid="count1" cid="countId1" />
        <div className="submit">
          <Button
            style={{
              backgroundColor: "#7130A1",
              fontSize: "18px",
              marginBottom: "24px"
            }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Save Settings
          </Button>
        </div>
      </div>
    );
  }
}

export default Form;
