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
    
    // if(nextProps.generateTest){
    //   this.generateTest();
    // }
    
  }

  // generateTest() {
  //   console.log("labas");
  // }

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

      this.songLength = Math.round(this.waveform.backend.getDuration());

      this.firstRegion = Math.round(this.songLength/4);
      this.secondRegion = Math.round(this.songLength/2);
      this.thirdRegion = Math.round(this.songLength/(1/0.75));

      this.waveform.addRegion({
        start: 0, // time in seconds
        end: this.firstRegion, // time in seconds
        color: 'rgba(0, 120, 224, 0.5)',
        drag: false,
        resize: false
      });
      this.waveform.addRegion({
        start: this.firstRegion, // time in seconds
        end: this.secondRegion, // time in seconds
        color: 'rgba(107, 100, 70, 0.5)',
        drag: false,
        resize: false
      });
      this.waveform.addRegion({
        start: this.secondRegion, // time in seconds
        end: this.thirdRegion, // time in seconds
        color: 'rgba(0, 120, 224, 0.5)',
        drag: false,
        resize: false
      });
      this.waveform.addRegion({
        start: this.thirdRegion, // time in seconds
        end: this.songLength, // time in seconds
        color: 'rgba(107, 100, 70, 0.5)',
        drag: false,
        resize: false
      });

    


    });



    function checkResults(correctAnswer, userAnswer){
      if(correctAnswer*1.1 >= userAnswer >= correctAnswer*0.9){
        console.log("good answer");
        return true;
      } else {
        console.log("bad answer");
        return false;
      }
    };
    
    this.waveform.on('audioprocess', () => {

      this.filter.type = "lowpass";
      this.filter.gain.value = 0;
      this.filter.Q.value = 1;
      this.filter.frequency.value = this.props.filterValue;

      this.currentTime = Math.round(this.waveform.getCurrentTime()) - 1;


      //CHECK IF CURRENT TIME CORRELATES WITH THE REGION ENDING
      if(this.currentTime == this.firstRegion) {

        checkResults(100, 100);
      };

      if(this.currentTime == 10){
        console.log("labas");
      }

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



