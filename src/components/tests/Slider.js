import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';

class Slider extends Component {


  render() {
    return (
      <div>
      <span id='currentSliderValue'>Pasirinkite dažnį, kuriame vyksta pokyčiai:  </span>

        <hr/>
        <h1>
        {this.props.value}
        </h1>
        

        <hr />

        <ReactBootstrapSlider
            value={this.props.value}
            change={this.props.changeValue}
            slideStop={this.props.changeValue}
            step={this.props.step}
            max={this.props.max}
            min={this.props.min}
            orientation="horizontal"
            reversed={false}
            // disabled="disabled" 
        />
        
        <hr/>
        
      </div>
    )
  }
}



export default Slider;