import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import WaveSurfer from 'wavesurfer.js';


class Player extends Component {

  shouldComponentUpdate() {
    return false;
  }

  getSongFromBucket() {
    // this.storage = firebase.storage().refFromURL()

  }

  componentWillReceiveProps(nextProps) {
    this.waveform.play(); 
  }

  componentDidMount() {
    this.waveform = new WaveSurfer.create({
      container: this.refs.waveform,
      waveColor: 'violet',
      progressColor: 'purple',
      barHeight: 20
    });

    

    this.waveform.load('https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3');
  }

  render() {
    return (
      <div>
        <div id="waveform" ref="waveform">

        </div>
      </div>
    )
  }
}

Player.propTypes = {
  firestore: PropTypes.object.isRequired
}

// export default Player;

export default firestoreConnect()(Player);



