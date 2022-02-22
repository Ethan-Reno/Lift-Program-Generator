import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationBar from './components/app-bar.component';
import Landing from './components/landing.component';
import SignIn from './auth/sign-in.component';
import SignUp from './auth/sign-up.component';
import Dashboard from './dashboard/dashboard.component';
import CreateProgram from './programs/create/create-program.component';
import ProgramDetails from './programs/display/program-details.component';
import SessionDetails from './programs/display/session-details.component';
import AmrapData from './programs/display/amrap-data.component';

const App = () => (
    <Router>
      <div>
        <ApplicationBar />
        <Routes>
          <Route path="/signin" element={SignIn} />
          <Route path="/signup" element={SignUp} />
          <Route path="/dashboard" element={Dashboard} />
          <Route path="/amrapdata" element={AmrapData} />
          <Route path="/create" element={CreateProgram} />
          <Route path="/programs/:id/:cycle/:lift/:session" element={SessionDetails} />
          <Route path="/programs/:id" element={ProgramDetails} />
          <Route path="/" element={Landing} />
        </Routes>
      </div>
    </Router>
)

export default App;
