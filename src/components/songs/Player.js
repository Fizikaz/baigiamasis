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
    if(nextProps.shouldPlay){
      this.waveform.play(); 
    }
    if(this.props.shouldPlay && !nextProps.shouldPlay){
      this.waveform.pause(); 
    }

    
  }

  componentDidMount() {
    this.waveform = new WaveSurfer.create({
      container: this.refs.waveform,
      waveColor: 'violet',
      progressColor: 'purple',
      barHeight: 1
    });

    console.log(this.props)

    this.waveform.load(this.props.songUrl);
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



