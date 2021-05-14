import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Container, 
  CssBaseline, 
  Typography, } from '@material-ui/core';
import { Program, Cycle, Lift, Set } from "../program.types";
import ActiveSetDisplay from "./active-set.component";

export default function SessionDisplay(props) {
  
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(4, 0, 0),
    },
    cardGrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    table: {
      minWidth: 100,
    },
    activeSet: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));
  
  const classes = useStyles();
  const programs = useSelector((state: any) => state.programs.programs) // any type for now, until I figure out how I want to type the redux state
  
  // Destructure and remove colons from params
  let {id, cycle, lift, session} = useParams();
  id = id.substring(1);
  cycle = cycle.substring(1);
  lift = lift.substring(1);
  session = session.substring(1);

  // Set all session values as session selected from the program view   -- TODO: import this as a util?
  let currentProgram: Program;
  programs.forEach((program: Program) => {
    if (program.uuid === id) {
      currentProgram = program;
    }
  });
  let currentCycle: Cycle = currentProgram.cycles[cycle];
  let currentLift: Lift;
  for (let i=0; i < currentCycle.lifts.length; i ++) {
    if (currentCycle.lifts[i].name === lift) {
      currentLift = currentCycle.lifts[i]
    }
  };
  let currentSession = currentLift.sessions[session];

  // Add 1 to display numbers to correct for 0 index
  const setCurrentNumber = (number) => {
    let currentNumber = parseInt(number) + 1;
    return currentNumber;
  }

  return(
    <React.Fragment>
      <CssBaseline />
      <main>

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              {currentLift.name}
            </Typography>
            <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
              Cycle: {setCurrentNumber(cycle)}
            </Typography>
            <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
              Session: {setCurrentNumber(session)}
            </Typography>
          </Container>
        </div>

        <Container maxWidth="xs">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
            
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Weight (lbs)</TableCell>
                  <TableCell align="justify">Reps</TableCell>
                </TableRow>
              </TableHead>

              {currentSession.sets.map((set: Set) => (
                <TableBody key={set.weight}>
                  <TableRow>
                    <TableCell align="justify">{set.weight}</TableCell>
                    <TableCell align="justify">{set.reps}</TableCell>
                  </TableRow>
                </TableBody>
              ))}

            </Table>
          </TableContainer>

          <ActiveSetDisplay currentLift={currentLift} currentSession={currentSession} currentCycle={cycle} currentProgram={currentProgram} />
        </Container>
        
      </main>
    </React.Fragment>
  )
}
