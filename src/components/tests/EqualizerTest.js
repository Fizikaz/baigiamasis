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
  //   const rootReducer = combineReducers({
  //         webAudioReducer
  //     });

  state = {
    testTypeSelected: "fixedEqualizer",
    currentValue: 20,
    max: 20000,
    min: 20
  };

  changeValue = e => {
    this.setState({
      currentValue: e.target.value
    });
  };

  render() {
    if(!this.props.song){
      return null
    }
    // var submittedResults = [];
    return (
      <div>
        <Player
          songUrl={this.props.song.songURL}
          testTypeSelected={this.state.testTypeSelected}
          shouldPlay={this.state.currentValue > 10000}
          
        />
        <hr />
        <Slider
          value={this.state.currentValue}
          changeValue={this.changeValue}
          step={this.state.step}
          max={this.state.max}
          min={this.state.min}
        />

        <button type="submit" className="btn btn-success">
          <Link to="/results">Finish</Link>
        </button>
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
