import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';
import { RRWAEngine, actionCreators, webAudioReducer } from 'react-redux-webaudio';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddSong from './components/songs/AddSong';
import SongDetails from './components/songs/SongDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Menu from './components/tests/Menu';
import EqualizerTest from './components/tests/EqualizerTest';
import { combineReducers } from 'redux';
import Results from './components/tests/Results'
// import { ReactComponent } from '*.svg';


class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          {/* <RRWAEngine /> */}
          <AppNavbar />
          <div className="container">
          <Switch>
            <Route 
              exact 
              path="/" 
              component={UserIsAuthenticated(Dashboard)} 
            />
            <Route 
              exact 
              path="/song/add" 
              component={UserIsAuthenticated(AddSong)} 
            />
            {/* <Route exact path="/song/:id" component={SongDetails} /> */}
            <Route 
              exact 
              path="/login" 
              component={UserIsNotAuthenticated(Login)} 
            />     
            <Route 
              exact  
              path="/register" 
              component={UserIsNotAuthenticated(Register)} 
            />
            <Route 
              exact  
              path="/song/:id" 
              component={UserIsAuthenticated(SongDetails)} 
            />
            <Route
              exact
              path='/menu'
              component={UserIsAuthenticated(Menu)}
            />
            <Route
              exact
              path='/equalizertest/:id'
              component={UserIsAuthenticated(EqualizerTest)}
            />
            <Route
              exact
              path='/results'
              component={UserIsAuthenticated(Results)}
            />
          </Switch>
          </div>
        </div>
        </Router>
      </Provider>
    );
  }
}


// const rootReducer = combineReducers({
//   webAudioReducer
// });

// const Container = connect(
//   state => state,
//   dispatch => ({ makeNoise: () => dispatch(actionCreators.emit(audioEvent)) })
// )(ReactComponent);

export default App;
