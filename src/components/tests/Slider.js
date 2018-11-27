import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';

class Slider extends Component {
  render() {
    return (
      <div>
        <ReactBootstrapSlider
            value={this.state.currentValue}
            change={this.changeValue}
            slideStop={this.changeValue}
            step={this.state.step}
            max={this.state.max}
            min={this.state.min}
            orientation="vertical"
            reversed={true}
            disabled="disabled" 
        />
      </div>
    )
  }
}

export default Slider;