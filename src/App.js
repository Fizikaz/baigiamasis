import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddSong from './components/songs/AddSong';
//import EditSong from './components/songs/EditSong';
import SongDetails from './components/songs/SongDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Menu from './components/tests/Menu';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
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
          </Switch>
          </div>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
