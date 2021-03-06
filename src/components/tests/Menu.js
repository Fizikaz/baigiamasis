// Select test between several

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      testValue: null
    };
  }

  onClick = (e) => {
    this.setState({
      testValue: e.target.value
    })
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };


  render() {

    const { userSongs = [] } = this.props



    return (
      <div>
        <h1 className="text-center">Ear training tests</h1>

        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">
              Choose song, that you will play with:
            </label>
            <select
              value={this.state.value}
              onChange={this.handleChange}
              className="form-control"
            >
              <option disabled selected value> -- select and option -- </option>
              {userSongs.map(song => (
                <option 
                key={song.id} 
                value={song.id}
                > {song.songName}

                </option> 
                

              ))}
            </select>
          </div>

          <label htmlFor="exampleFormControlSelect1">Choose frequencies to play with: </label>
          <hr />
          <ButtonGroup>
            <Button value={"fixed"} onClick={this.onClick}  bsStyle={this.state.testValue === "fixed" ? "primary": ""}>FIXED</Button>
            <Button value={"nonfixed"} onClick={this.onClick} bsStyle={this.state.testValue === "nonfixed" ? "primary": ""}>RANDOM</Button>
          </ButtonGroup>

          <h4 className="mt-3" >* Tests can be generated from FIXED values(50, 100, 250, 500, 1000, 3000, 5000, 7500, 10000, 12000, 15000) and from RANDOM</h4>

          <hr />
          <div className="form-check" />
          <button type="submit" className="btn btn-success">
            <Link
              to={`/EqualizerTest/${this.state.value}`}
              style={{ textDecoration: 'none', color: 'white' }}
              className="nav-link"
            >
              Play
            </Link>
          </button>
        </form>
      </div>
    );
  }
}


Menu.propTypes = {
  firestore: PropTypes.object.isRequired,
  userSongs: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'songs' }]),
  connect((state, props) => ({
    userSongs: state.firestore.ordered.songs,
    auth: state.firebase.auth
  }))
)(Menu);
