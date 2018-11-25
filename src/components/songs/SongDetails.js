import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

import Player from './Player';


class SongDetails extends Component {



  render() {

    const { song } = this.props;

    // if(song) {

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
                <Link to={'/song/edit/${songId}'} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-header">
              {song}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>Song ID:{''} <span className="text-secondary">{}</span></h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  
                  </div>
              </div>
              <Player />
            </div>
          </div>
  

{/* <div id="peaks-container">

<audio src="./test.mp3" type="audio/mpeg" controls autoPlay />
<script src="bower_components/requirejs/require.js" data-main="app.js"></script>
</div> */}



      </div>
    );
    // } else {
    //   return <Spinner />;
    // }
  }
}

SongDetails.propType = {
  firestore: PropTypes.object.isRequired
};


export default compose(
    firestoreConnect(props => [
        { collection: 'songs', storeAs: 'song', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
      songs: ordered.song && ordered.song[0]
    }))
  )(SongDetails);
