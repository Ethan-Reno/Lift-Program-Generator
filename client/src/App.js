import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ApplicationBar from './components/AppBar.js'
import Landing from './components/Landing'

function App() {
  return (
    <Router>
          <ApplicationBar />
          <Landing />
    </Router>
  );
}

export default App;
