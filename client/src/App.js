import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplicationBar from './components/AppBar';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import List from './components/List';

const App = () => (
    <Router>
      <div>
        <ApplicationBar />

        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/list" component={List} />
          <Route exact path="/" component={Landing} />

        </Switch>
      </div>
    </Router>
)

export default App;
