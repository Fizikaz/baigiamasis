import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import WaveSurfer from 'wavesurfer.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';


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
      normalize: true,
      responsive: true,
      interact: false,
      plugins: [
        Regions.create({
        })
      ]
    });





    this.waveform.on('ready', () => {


     
        var filter = this.waveform.backend.ac.createBiquadFilter();
        filter.type = "lowpass";
        filter.gain.value = 0;
        filter.Q.value = 1;
        filter.frequency.value = 100;


      this.waveform.backend.setFilters(filter);


      // var duration = this.waveform.backend.getDuration();

      var songDuration = this.waveform.backend.getDuration();
      var songLength = Math.round(songDuration);


            // FIRST REGION
            this.waveform.addRegion({
              start: 0, // time in seconds
              end: songLength/4, // time in seconds
              color: 'rgba(0, 120, 224, 0.5)',
              drag: false,
              resize: false
            });
      
            // SECOND REGION
            this.waveform.addRegion({
              start: songLength/4, // time in seconds
              end: songLength/2, // time in seconds
              color: 'rgba(107, 100, 70, 0.5)',
              drag: false,
              resize: false
            });
      
            // THIRD REGION
            this.waveform.addRegion({
              start: songLength/2, // time in seconds
              end: songLength/(1/0.75), // time in seconds
              color: 'rgba(0, 120, 224, 0.5)',
              drag: false,
              resize: false
            });
      
            // FOURTH REGION
            this.waveform.addRegion({
              start: songLength/(1/0.75), // time in seconds
              end: songLength, // time in seconds
              color: 'rgba(107, 100, 70, 0.5)',
              drag: false,
              resize: false
            });

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

Player.propTypes = {
  firestore: PropTypes.object.isRequired
}

// export default Player;

export default firestoreConnect()(Player);



