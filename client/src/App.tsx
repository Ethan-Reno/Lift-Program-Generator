import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplicationBar from './components/app-bar.component';
import Landing from './components/landing.component';
import SignIn from './auth/sign-in.component';
import SignUp from './auth/sign-up.component';
import Dashboard from './dashboard/dashboard.component';
import Counter from './counter/counter.component'
import CreateProgram from './programs/create/create-program.component';
import Program from './programs/display/program.component';
// import TestState from './programs/test-state.component';

const App = () => (
    <Router>
      <div>
        <ApplicationBar />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/counter" component={Counter} />
          <Route path="/program/create" component={CreateProgram} />
          <Route path="/program" component={Program} />
          {/* <Route path="/test" component={TestState} /> */}
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
)

export default App;
