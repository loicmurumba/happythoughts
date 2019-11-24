import React from "react";
import CounterInput from "react-counter-input";

class CountSlider extends React.Component {
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
          <div class="col-md-10">
            <p className="header">{this.props.name}</p>
          </div>
          <div class="col-md-2">
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
        <div class="picker">
          {this.state.isSelected && (
            <div class="row">
              <div class="counter">
                <CounterInput min={0} max={12} onCountChange={count => console.log(count)} />
              </div>
              <div class="counter-label">memes per day</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CountSlider;
