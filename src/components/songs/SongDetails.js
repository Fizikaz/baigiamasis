import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase, { auth } from 'firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

import VanillaPlayer from './VanillaPlayer';


class SongDetails extends Component {

  constructor(props) {
    super(props);

  }

  state = {
      isPlaying: false
  };

  handlePlaying = e => {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  };

  componentWillUnmount() {
    this.setState({
      isPlaying: false
    });

    // console.log("unmounting songdetails");
  }

  onDeleteClick = () => {

    const { song, firestore, history } = this.props;
    
    var songRef = firebase.storage().refFromURL(this.props.song.songURL)

    songRef.delete()
    firestore.delete({collection: 'songs', doc: song.id})
    .then(() => history.push('/'));
  }

  render() {
    const song = this.props.song;

    if(!song){
      return null
    }

    console.log("render method", song.songURL);

    return (
      <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-header">
             {song.songArtist} - {song.songName}
            </h3>
            <div className="card-body">
              <div className="row">

                <div className="col-md-4 col-sm-6">
        
                  </div>
              </div>
              <VanillaPlayer
                    songUrl={song.songURL}
                    shouldPlay={this.state.isPlaying}
               />
            </div>           
              <button  onClick={this.handlePlaying} className="btn btn-lg btn-success m-2">
                Play/Pause
              </button>
          </div>
      </div>
    );
  }
}

SongDetails.propType = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.shape({
    deleteFile: PropTypes.func.isRequired
  })
};


export default compose(
    firestoreConnect(props => [
        { collection: 'songs', storeAs: 'song', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
      song: ordered.song && ordered.song[0]
    }))
  )(SongDetails);
