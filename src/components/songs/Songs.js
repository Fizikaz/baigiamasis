import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import { parse } from 'url';
import { auth } from 'firebase';

class Songs extends Component {
  state = {
    totalSongs: null
  }

  static getDerivedStateFromProps(props, state){
    const { songs } = props;
    // const { auth } = props;

    if(songs) {
      //Add song number
      const total = songs.reduce((total, song) => {
        return total + parseFloat(song.songSize.toString()); // Read firebase number
      }, 0);

      return { totalSongs: total };
    }

    return null;
  }

  render() {
    const { userSongs } = this.props;
    const { totalSongs } = this.state;
    const { auth } = this.props;

    if(userSongs){
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
              {' '}
              <i className="fas fa-music" /> Songs{' '}
              </h2>
            </div>
            <div className="col-md-6">
              {/* <h5 className="text-right text-secondary">
                Total Songs Length{' '}
                <span className="text-primary">
                {parseFloat(totalSongs)}
                </span>
              </h5> */}
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Artist</th>
                <th>Name</th>
                <th>Genre</th>
                {/* <th>Size</th>
                <th>Length</th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {userSongs.map(song => (
                <tr key={song.id}>
                  <td>{song.songArtist}</td>
                  <td>{song.songName}</td>
                  <td>{song.songGenre}</td>
                  {/* <td>{parseFloat(song.songSize).toFixed(2)}MB</td>
                  <td>{song.songLength}min</td> */}
                  <td>
                    <Link to={'/song/' + song.id} className="btn btn-secondary btn-sm">
                    <i className="fas fa-arrow-circle-right"></i> Listen
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

Songs.propTypes = {
  firestore: PropTypes.object.isRequired,
  userSongs: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'songs' }]),
  connect((state, props) => ({
    userSongs: state.firestore.ordered.songs,
    auth: state.firebase.auth
  }))
)(Songs);
