import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose, combineReducers } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

import Spinner from '../layout/Spinner';
import Player from "../songs/Player";
import Slider from "../tests/Slider";

// import QuestionCounter from "../tests/QuestionCounter";

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
    isPlaying: false,
    finishedLoading: false
  };

  componentDidMount() {
    this.setState({
      testDate: new Date().toLocaleString()
    });

    this.generateTest();
  }

  generateTest = e => {
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
    this.setState({
      isPlaying: false
    });
  }

  finishTest = e => {
    this.setState({
      testFinished: true
    });
  }

  handler = e => {
    this.setState({
      finishedLoading: true
    })
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
        <h2>{this.props.song.songArtist} - {this.props.song.songName}</h2>
        <Player
          // ref={this.player}
          songUrl={this.props.song.songURL}
          testTypeSelected={this.state.testTypeSelected}
          shouldPlay={this.state.isPlaying}
          filterValue={this.state.currentValue}
          finishedLoading={this.state.finishedLoading}
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

        <button  onClick={this.handlePlaying} className="btn btn-lg btn-success m-2">
          Play
        </button>
        <button type="submit" onClick={this.onSubmit} className="btn btn-lg btn-success m-2">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/results">Finish</Link>
        </button>
        {/* <button onClick={this.onSubmit} className="btn btn-success" >Hello</button> */}
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

