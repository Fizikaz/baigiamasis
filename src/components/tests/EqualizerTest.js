import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose, combineReducers } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

import Spinner from '../layout/Spinner';
import Player from "../songs/Player";
import Slider from "../tests/Slider";


class EqualizerTest extends Component {


  state = {
    testDate: "",
    testFinished: false,
    testId: null,
    testScore: null,
    testValues: [ ],
    testSubmittedValues: [ ],
    testType: "fixedEqualizer",
    currentValue: 16000,
    max: 16000,
    min: 20,
    isPlaying: false,
    finishedLoading: false
  };

  componentWillMount() {
    this.generateTest();
    this.setState({
      testDate: new Date().toLocaleString()
    });

  }

  // componentDidMount() {
  //   this.checkResults(100, 100);
  // }

  componentWillUnmount() {
    this.setState({
      isPlaying: false
    });
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

  // finishTest = e => {
  //   this.setState({
  //     testFinished: true,
  //     isPlaying: false
  //   });
  // }

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


  // calculateScore = (userAnswer, correctAnswer) => {

  //   let score = (correctAnswer - Math.abs(correctAnswer - userAnswer)) / correctAnswer * 100;
  //   console.log(score);

  // };

  onSubmit = e => {

    //IRASYTI SCORE BENDRA
    e.preventDefault();

    this.setState({
      isPlaying: false
    });

    this.setState({
      testDate: new Date().toLocaleString()
    });

    const newTest = this.state;
    const { firestore, history } = this.props;

    firestore.add({ collection: 'tests' }, newTest)
    .then((docRef) => history.push(`/results/${docRef.id}`))
    .catch(error => console.error("Error adding document: ", error));

};


      // IRASYTI REZULTATUS I STATE ESANTI testSubmittedValues MASYVA
  writeResults = (userAnswer, correctAnswer) => {

    let testSubmittedValues = this.state.testSubmittedValues;

    testSubmittedValues.push({eqValue: userAnswer});

   // this.calculateScore(userAnswer, correctAnswer);

    this.setState({ 
      testSubmittedValues: testSubmittedValues
     });
  }

  render() {
    if(!this.props.song){
      return null
    }

    return (
      <div>
        <h2>{this.props.song.songArtist} - {this.props.song.songName}</h2>
        <Player
          songUrl={this.props.song.songURL}
          testTypeSelected={this.state.testTypeSelected}
          shouldPlay={this.state.isPlaying}
          filterValue={this.state.currentValue}
          finishedLoading={this.state.finishedLoading}
          writeResults={this.writeResults}
          generatedValues={this.state.testValues}
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
      </div>
    );
  }
}

EqualizerTest.propType = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "songs", storeAs: "song", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    song: ordered.song && ordered.song[0]
  }))
)(EqualizerTest);

