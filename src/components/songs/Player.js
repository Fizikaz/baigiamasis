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

      this.filter = this.waveform.backend.ac.createBiquadFilter();


      this.waveform.backend.setFilters([this.filter]);


      // var duration = this.waveform.backend.getDuration();

      var songDuration = this.waveform.backend.getDuration();
      var songLength = Math.round(songDuration);

      this.firstRegion = songLength/4;
      this.secondRegion = songLength/2;
      this.thirdRegion = songLength/(1/0.75)


            // FIRST REGION
            this.waveform.addRegion({
              start: 0, // time in seconds
              end: this.firstRegion, // time in seconds
              color: 'rgba(0, 120, 224, 0.5)',
              drag: false,
              resize: false
            });
      
            // SECOND REGION
            this.waveform.addRegion({
              start: this.firstRegion, // time in seconds
              end: this.secondRegion, // time in seconds
              color: 'rgba(107, 100, 70, 0.5)',
              drag: false,
              resize: false
            });
      
            // THIRD REGION
            this.waveform.addRegion({
              start: this.secondRegion, // time in seconds
              end: this.thirdRegion, // time in seconds
              color: 'rgba(0, 120, 224, 0.5)',
              drag: false,
              resize: false
            });
      
            // FOURTH REGION
            this.waveform.addRegion({
              start: this.thirdRegion, // time in seconds
              end: songLength, // time in seconds
              color: 'rgba(107, 100, 70, 0.5)',
              drag: false,
              resize: false
            });

    });


    
    this.waveform.on('audioprocess', () => {

      this.filter.type = "lowpass";
      this.filter.gain.value = 0;
      this.filter.Q.value = 1;
      this.filter.frequency.value = this.props.filterValue;

      this.currentTime = this.waveform.getCurrentTime() - 1;

      function checkResults(correctAnswer, userAnswer){
        if(correctAnswer*1.1 >= userAnswer >= correctAnswer*0.9){
          console.log("good answer");
          return true;
        } else {
          console.log("bad answer");
          return false;
        }

      };

      //CHECK IF CURRENT TIME CORRELATES WITH THE REGION ENDING
      if(this.currentTime == this.firstRegion) {
        checkResults(100, 100);
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



