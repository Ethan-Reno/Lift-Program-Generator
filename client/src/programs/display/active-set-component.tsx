import React, { useState } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { 
  Button,
  ButtonGroup,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Grid, 
  Paper, 
  TextField,
  Typography, } from '@material-ui/core';
  import Countdown from 'react-countdown';
// import { Program, Cycle, Lift, Set } from "../program.types";

export default function ActiveSetDisplay({currentSession, currentProgram}) { //props = currentSession, 
  
  // const useStyles = makeStyles((theme) => ({
  //   heroContent: {
  //     padding: theme.spacing(4, 0, 0),
  //   },
  //   cardGrid: {
  //     paddingTop: theme.spacing(4),
  //     paddingBottom: theme.spacing(4),
  //   },
  //   table: {
  //     minWidth: 100,
  //   },
  //   activeSet: {
  //     paddingTop: theme.spacing(4),
  //     paddingBottom: theme.spacing(4),
  //   },
  // }));

  const history = useHistory();

  const [activeSet, setActiveSet] = useState(0);
  const [sessionIsActive, setSessionIsActive] = useState(false);
  const [betweenSets, setBetweenSets] = useState(false);
  const [amrapInput, setAmrapInput] = useState(0);

  let finalSet = currentSession.sets.length - 1;

  const handleSetChange = (activeSet: number) => {
    if (activeSet === finalSet) {
      return console.log('maxed out');
    } else {
      return setActiveSet(activeSet + 1);
    }
  }

  const handleBetweenSets = () => {
    return setBetweenSets(!betweenSets)
  }

  const handleRedirect = (path: string) => {
    history.push( { pathname: path} )
  }

  let table = null;
  let buttons = null;
  const TimerComplete = () => <span>Good to go!</span>;

  const renderer = ({minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <TimerComplete />;
    } else {
      // Render a countdown
      return <span>{minutes}:{seconds}</span>;
    }
  };

  if (sessionIsActive) {
    table = <React.Fragment>
      <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>Set: {activeSet + 1}</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell align="justify">Weight (lbs)</TableCell>
              <TableCell align="justify">Reps</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell align="justify">{currentSession.sets[activeSet].weight}</TableCell>
              <TableCell align="justify">{currentSession.sets[activeSet].reps}</TableCell>
            </TableRow>
          </TableBody>
          
        </Table>
      </TableContainer>
    </React.Fragment>;
    if (betweenSets) {
      buttons = <ButtonGroup>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {handleBetweenSets()}}
        >
          Begin next set
        </Button>
        <Countdown date={Date.now() + 179000} renderer={renderer}/>
      </ButtonGroup>;
    } else if (activeSet === finalSet) {
      buttons = <ButtonGroup>
        <TextField
          variant="outlined"
          required
          fullWidth
          onChange={e => setAmrapInput(parseInt(e.target.value))}
          label="amrap input"
          name="amrapInput"
          type="number"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleRedirect(`/programs/:${currentProgram.uuid}`)}
        >
          Complete Session
        </Button>
      </ButtonGroup>
    } else {
      buttons = <ButtonGroup>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {handleSetChange(activeSet); handleBetweenSets()}}
        >
          Finish Set
        </Button>
      </ButtonGroup>
    }
  } else {
    buttons = <Grid container direction="row" justify="center" alignItems="center">
      <ButtonGroup>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setSessionIsActive(!sessionIsActive)}
        >
          Begin Session
        </Button>
      </ButtonGroup>
    </Grid>
  }

  return (
    <div>
      {table}
      {buttons}
    </div>
  )
}

