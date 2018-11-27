// Select test between several

import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songListValue: "song1",
      testValues: "fiksuoti"
    };
  }

  handleChange = e => {
    this.setState({ songListValue: e.target.songListValue });
  };

  handleSubmit = e => {
    alert("You have selected this song" + this.state.songListValue);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Ear training tests</h1>

        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">
              Choose song, that you will play with:
            </label>
            <select
              songListValue={this.state.songListValue}
              onChange={this.handleChange}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option songListValue="song1">Song 1</option>
              <option songListValue="song2">Song 2</option> // extract songs
              from user SongList
              <option songListValue="song3">Song 3</option>
              <option songListValue="song4">Song 4</option>
              <option songListValue="song5">Song 5</option>
            </select>
          </div>

          <label htmlFor="exampleFormControlSelect1">Choose test type: </label>

          {/* <div className="form-check">
            <input type="radio" className="form-check-input"/>
            <label htmlFor="testTypeFix" className="form-check-label">
              Fiksuoti dažniai
            </label>
          </div>

          <div className="form-check">
            <input type="radio" className="form-check-input"/>
            <label htmlFor="testTypeFix" className="form-check-label">
              Nefiksuoti dažniai
            </label>
          </div> */}

          <hr/>

        <ButtonGroup>
          <Button>Fixed</Button>
          <Button>Non-fixed</Button>
        </ButtonGroup>

        <hr/>
          <div className="form-check" />
          <button type="submit" class="btn btn-success">
          <Link to="/EqualizerTest" className="nav-link">
          Play
          </Link>
            
          </button>
        </form>
      </div>
    );
  }
}

export default Menu;
