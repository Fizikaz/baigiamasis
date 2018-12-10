import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import QuestionCounter from './QuestionCounter';

class Slider extends Component {



  // handleEvent = (e) => {
  //   this.setState({
  //     currentValue: e
  //   })
  // }

  // onChangeSliderValue(newSliderValue) {
  //   this.setState({
  //     currentValue: newSliderValue
  //   });
  // }

  render() {
    return (
      <div>
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
        <span id='currentSliderValue'>Current Slider Value: {this.props.value} </span>
      </div>
    )
  }
}



export default Slider;