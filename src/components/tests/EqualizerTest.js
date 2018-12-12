import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose, combineReducers } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

import Player from "../songs/Player";
import Slider from "../tests/Slider";

//import QuestionCounter from "../tests/QuestionCounter";

class EqualizerTest extends Component {
  
  // constructor(props) {
  //   super(props);
  //   this.player = React.createRef();
  // }

  state = {
    testDate: "",
    testFinished: false,
    testId: null,
    testScore: null,
    testValues: [ ],
    testSubmittedValues: [
      // { eqValue: 450 },
      // { eqValue: 1050 },
      // { eqValue: 800 },
      // { eqValue: 400 }
    ],
    testType: "fixedEqualizer",
    currentValue: 16000,
    max: 16000,
    min: 20,
    isPlaying: false
  };

  componentDidMount() {
    this.setState({
      testDate: new Date().toLocaleString()
    });

    this.setState({
      testValues: [
        { eqValue: Math.floor((Math.random() * 16000) + 1)},
        { eqValue: Math.floor((Math.random() * 16000) + 1)},
        { eqValue: Math.floor((Math.random() * 16000) + 1)},
        { eqValue: Math.floor((Math.random() * 16000) + 1)}
      ]
    });
  }

  componentWillUnmount() {

  }

  finishTest = e => {
    this.setState({
      testFinished: true
    });
  }

  changeValue = e => {
    this.setState({
      currentValue: e.target.value
    });
  };

  handlePlaying = e => {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  };

  // handleGenerateTest = e => {
  //   this.player.current.generateTest();
  // }

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      testDate: new Date().toLocaleString()
    });

    const newTest = this.state;
    const { firestore, history } = this.props;

    firestore.add({ collection: 'tests' }, newTest)
    .then(() => history.push('/'));
};

  render() {
    if(!this.props.song){
      return null
    }

    return (
      <div>
        <Player
          // ref={this.player}
          songUrl={this.props.song.songURL}
          testTypeSelected={this.state.testTypeSelected}
          shouldPlay={this.state.isPlaying}
          filterValue={this.state.currentValue}
          // correctAnswer={this.state.testValues}
          // userAnswer={this.state.testSubmittedValues}
        />
        <hr />
        <Slider
          value={this.state.currentValue}
          changeValue={this.changeValue}
          step={this.state.step}
          max={this.state.max}
          min={this.state.min}
        />

        <button  onClick={this.handlePlaying} className="btn btn-success">
          Play
        </button>
        <button type="submit" className="btn btn-success">
          <Link to="/results">Finish</Link>
        </button>
        <button onClick={this.onSubmit} className="btn btn-success" >Hello</button>
      </div>
    );
  }
}

EqualizerTest.propType = {
  firestore: PropTypes.object.isRequired
};

// export default EqualizerTest;

export default compose(
  firestoreConnect(props => [
    { collection: "songs", storeAs: "song", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    song: ordered.song && ordered.song[0]
  }))
)(EqualizerTest);

