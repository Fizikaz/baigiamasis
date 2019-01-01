import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import WaveSurfer from 'wavesurfer.js';


class VanillaPlayer extends Component {

  shouldComponentUpdate() {
    return false;
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
      normalize: true,
      responsive: true,
      interact: true,
    });

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

VanillaPlayer.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(VanillaPlayer);



