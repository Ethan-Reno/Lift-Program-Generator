import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplicationBar from './components/app-bar.component';
import Landing from './components/landing.component';
import SignIn from './auth/sign-in.component';
import SignUp from './auth/sign-up.component';
import Dashboard from './dashboard/dashboard.component';
import Counter from './counter/counter.component'
import CreateProgram from './programs/create/create-program.component';
import ProgramDetails from './programs/display/program-details.component';

const App = () => (
    <Router>
      <div>
        <ApplicationBar />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/counter" component={Counter} />
          <Route path="/create" component={CreateProgram} />
          <Route path="/programs/:id" component={ProgramDetails} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
)

export default App;
