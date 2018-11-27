import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Player from '../songs/Player';
import Slider from '../tests/Slider';


class EqualizerTest extends Component {

//   const rootReducer = combineReducers({
//         webAudioReducer
//     });

  constructor(props){
    super(props);
        this.state = {
            songSelected: 'https://ia902508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3',
            testTypeSelected: 'fixedEqualizer'
        }
    }

  render() {
    return (
      <div>
      
      <Player songSelected={this.state.songSelected} testTypeSelected={this.state.testTypeSelected} />
      {/* <Slider /> */}
      </div>
    )
  }
}

EqualizerTest.propType = {
    firestore: PropTypes.object.isRequired
  };

// export default EqualizerTest;


export default compose(
    firestoreConnect(props => [
        { collection: 'songs', storeAs: 'song', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
      songs: ordered.song && ordered.song[0]
    }))
  )(EqualizerTest);