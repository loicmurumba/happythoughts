import React, { Component } from "react";

class TimeSliders extends Component {
  state = {
    selectedDate: Date.now(),
    setSelectedDate: Date.now(),
    morningSelected: true
  };

  handleDateChange = date => {
    setSelectedDate(date);
  };

  handleMorningUpdate = event => {
    const checked = event.target.checked;
    console.log(checked);
    this.setState({
      morningSelected: checked
    });
  };

  render() {
    return (
      <div class="row">
        <div class="col-md-10">
          <p className="header">Morning Motivation</p>
        </div>
        <div class="col-md-2">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
              checked={this.state.morningSelected}
              onChange={this.handleMorningUpdate}
            />
            <label class="custom-control-label" for="customSwitch1" />
          </div>
        </div>
      </div>
      //   {this.state.morningSelected && (
      //     <div class="picker">
      //       <MuiPickersUtilsProvider utils={DateFnsUtils}>
      //         <KeyboardTimePicker
      //           margin="normal"
      //           id="time-picker"
      //           label="Select a time"
      //           value={this.selectedDate}
      //           onChange={this.handleDateChange}
      //           KeyboardButtonProps={{
      //             "aria-label": "change time"
      //           }}
      //         />
      //       </MuiPickersUtilsProvider>
      //     </div>
      //   )}
    );
  }
}

export default TimeSliders;
