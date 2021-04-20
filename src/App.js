  
import React, { Component } from 'react';
import HomePageContainer from './containers/HomePageContainer';
import { connect } from 'react-redux';
import NavPanel from './NavPanel';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavPanel/>
        <Router>
          <div>
            <Route exact path="/" component={HomePageContainer} />
          </div>
        </Router>
      </div>
    );
  }
}


export default connect()(App);
