import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Login from '../auth/Login';

class AppNavbar extends Component {
    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } =  props;

        if(auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }

    onLogoutClick = (e) => {
        e.preventDefault();

        const { firebase } = this.props;
        firebase.logout();
    }

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;


    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
                Songs
            </Link>
            <button 
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarMain">

                <ul className="navbar-nav mr-auto">
                {isAuthenticated ? (
                    <li className="nav-item">
                        <Link to="/Menu" className="nav-link">
                            Take test!
                        </Link>
                    </li>
                    ) : null}
                </ul>

                {isAuthenticated ? (
                    <ul className="navbar-nav ml-auto">
                        
                        
                        <li className="nav-item" >
                            <Link to="/chart" className="nav-link">
                                { auth.email }
                            </Link>
                        </li>
                    
                        
                        <li className="nav-item">
                            <a href="#!" className="nav-link" onClick={this.onLogoutClick}>
                                Logout
                            </a>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                    </ul>

                )}
            </div>
          </div>
      </nav> 
    )
  }
}

AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AppNavbar);
