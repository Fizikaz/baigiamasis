import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import WaveSurfer from 'wavesurfer.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';


class Player extends Component {

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

  changeFrequency = (filterValue) => {
    this.filter.type = "lowpass";
    this.filter.gain.value = 0;
    this.filter.Q.value = 1;
    this.filter.frequency.value = filterValue;

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

      // checks if song is finished and stops spinner gif from parent element
      this.areWeFinished = true;
      this.areWeFinished = this.props.finishedLoading;

      this.filter = this.waveform.backend.ac.createBiquadFilter();
      this.waveform.backend.setFilters([this.filter]);

      this.songLength = Math.round(this.waveform.backend.getDuration());

      this.region = [];
      this.regionChecked = [false, false, false, false, false];

      this.region[0] = Math.round(this.songLength/4);
      this.region[1] = Math.round(this.songLength/2);
      this.region[2] = Math.round(this.songLength/(1/0.75));

      this.waveform.addRegion({
        start: 0, // time in seconds
        end: this.region[0], // time in seconds
        color: 'rgba(0, 120, 224, 0.5)',
        drag: false,
        resize: false
      });
      this.waveform.addRegion({
        start: this.region[0], // time in seconds
        end: this.region[1], // time in seconds
        color: 'rgba(107, 100, 70, 0.5)',
        drag: false,
        resize: false
      });
      this.waveform.addRegion({
        start: this.region[1], // time in seconds
        end: this.region[2], // time in seconds
        color: 'rgba(0, 120, 224, 0.5)',
        drag: false,
        resize: false
      });
      this.waveform.addRegion({
        start: this.region[2], // time in seconds
        end: this.songLength, // time in seconds
        color: 'rgba(107, 100, 70, 0.5)',
        drag: false,
        resize: false
      });
    });


    
   this.waveform.on('audioprocess', () => {

      //CHECK IF CURRENT TIME CORRELATES WITH THE REGION ENDING

      //PRIDETI REGIONA
      this.currentTime = Math.round(this.waveform.getCurrentTime()) - 1;

      if(this.currentTime < this.region[0] && this.regionChecked[0] === false){
        this.regionChecked[0] = true;
        this.changeFrequency(this.props.generatedValues[0].eqValue);
      };
      if(this.currentTime === this.region[0] && this.regionChecked[1] === false) {
                   // irasyti slider verte i lentele
        this.regionChecked[1] = true;
        this.changeFrequency(this.props.generatedValues[1].eqValue);
        this.props.writeResults(this.props.filterValue, this.props.generatedValues[0].eqValue);
      };
      if(this.currentTime === this.region[1] && this.regionChecked[2] === false) {
        this.regionChecked[2] = true;
        this.changeFrequency(this.props.generatedValues[2].eqValue);
        this.props.writeResults(this.props.filterValue, this.props.generatedValues[1].eqValue);
      };
      if(this.currentTime === this.region[2] && this.regionChecked[3] === false) {
        this.regionChecked[3] = true;
        this.changeFrequency(this.props.generatedValues[3].eqValue);
        this.props.writeResults(this.props.filterValue, this.props.generatedValues[2].eqValue);
      };

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



