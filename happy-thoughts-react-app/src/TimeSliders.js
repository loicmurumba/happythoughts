import React, { useState } from "react";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function Picker(props) {
  const [selectedDate, handleDateChange] = useState(Date.now());
  return (
    <div class="picker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          margin="normal"
          id={props.cid}
          label="Select a time"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
class TimeSliders extends React.Component {
  state = {
    isSelected: true
  };

  handleUpdate = () => {
    this.setState(prev => {
      return { isSelected: !prev.isSelected };
    });
  };

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-md-11">
            <p className="header">{this.props.name}</p>
          </div>
          <div class="col-md-1">
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id={this.props.lid}
                checked={this.state.isSelected}
                onChange={this.handleUpdate}
              />
              <label class="custom-control-label" for={this.props.lid} />
            </div>
          </div>
        </div>
        {this.state.isSelected && <Picker cid={this.props.cid} />}
      </div>
    );
  }
}

export default TimeSliders;
