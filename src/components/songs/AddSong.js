import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import FileUploader from 'react-firebase-file-uploader';
import firebase, { auth } from 'firebase';
import { runInThisContext } from 'vm';

class AddSong extends Component {
    state = {
        songArtist: '',
        songName: '',
        songGenre: '',
        songSize: '',
        songLength: '',
        isUploading: false,
        progress: 0,
        songStorageId: ""
    }

handleUploadStart = () => this.setState({ isUploading: true, progress: 0});
handleProgress = progress => this.setState({ progress });
handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
};
handleUploadSuccess = filename => {
    this.setState({ songStorageId: filename, progress: 100, isUploading: false });
    firebase
        .storage()
        .ref("songs")
        .child(auth.uid)
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ avatarURL: url }));
};

onSubmit = (e) => {
    e.preventDefault();

    const newSong = this.state;

    const { firestore, history } = this.props;

    // if no balance, make 0
    if(newSong.songSize === '') {
        newSong.songSize = 0;
    }
    
    firestore.add({ collection: 'songs' }, newSong)
    .then(() => history.push('/'));
};

onChange = (e) => this.setState({ [e.target.name]: e.target.value});

  render() {
    return (
      <div>
        <div className="row">
            <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                    <i className="fas fa-arrow-circle-left"></i>Back to Dashboard
                </Link>
            </div>
        </div>

        <div className="card">
            <div className="card-header">Add Song</div>
            <div className="card-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="songArtist">Song Artist</label>
                        <input 
                        type="text" 
                        className="form-control"
                        name="songArtist"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={this.state.songArtist}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="songName">Song Name</label>
                        <input 
                        type="text" 
                        className="form-control"
                        name="songName"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={this.state.songName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="songGenre">Song Genre</label>
                        <input 
                        type="text" 
                        className="form-control"
                        name="songGenre"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={this.state.songGenre}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="songGenre">Upload song</label>
                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        {/* {this.state.avatarURL && <img src={this.state.avatarURL} />} */}
                        <FileUploader 
                            className="form-control"
                            accept="audio/*"
                            name="song"
                            required
                            randomizeFilename
                            storageRef={firebase.storage().ref("songs")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    </div>

                    <input 
                    type="submit" 
                    value="Submit"
                    className="btn btn-primary btn-block"
                    />
                </form>
            </div>
        </div>
      </div>
    )
  }
}

AddSong.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddSong); // we are not getting back anything from firestore