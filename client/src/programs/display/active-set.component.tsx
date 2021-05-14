import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { 
  Box,
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
import { AmrapData } from "../program.types";
import { markSessionComplete } from "../programs.slice";
import { storeData } from "../amrap-data.slice";
import { useDispatch } from 'react-redux';

export default function ActiveSetDisplay({currentLift, currentSession, currentCycle, currentProgram}) { //props = currentSession, 
  
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1, 0, 2),
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeSet, setActiveSet] = useState(0);
  const [sessionIsActive, setSessionIsActive] = useState(false);
  const [betweenSets, setBetweenSets] = useState(false);
  const [amrapInput, setAmrapInput] = useState(0);

  let finalSet = currentSession.sets.length - 1;
  let setWeight = currentSession.sets[activeSet].weight;
  let setReps = currentSession.sets[activeSet].reps;

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
    history.push({pathname: path},  )
  }

  // Add 1 to display numbers to correct for 0 index
  const setCurrentNumber = (number) => {
    let currentNumber = parseInt(number) + 1;
    return currentNumber;
  }

  const calculate1RM = (weight: number, reps: number) => {
    let c1RM: number;
    let brackets = 1 + reps / 30;
    if (reps === 1) {
      c1RM = 1;
    } else {
      c1RM = weight * brackets
    }
    return Math.ceil(c1RM);
  }

  // const createDate = () => {
  //   let today = new Date();
  //   const formattedDate = format(today, 'dd.MM.yyyy');
  //   return formattedDate;
  // }

  const programDetails = {
    uuid: currentProgram.uuid,
    cycle: parseInt(currentCycle),
    lift: currentLift.name,
    session: currentSession.number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amrapData: AmrapData = {
      lift: currentLift.name,
      timestamp: Date.now(),
      weight: setWeight,
      reps: amrapInput,
      c1RM: calculate1RM(setWeight, amrapInput),
      programUuid: currentProgram.uuid,
      programTitle: currentProgram.title,
      cycle: setCurrentNumber(currentCycle),
      session: setCurrentNumber(currentSession.number),
    };
    dispatch(storeData(amrapData));
    dispatch(markSessionComplete(programDetails));
    handleRedirect(`/programs/:${currentProgram.uuid}`)
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
              <TableCell align="justify">{setWeight}</TableCell>
              <TableCell align="justify">{setReps}</TableCell>
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
          className={classes.button}
          onClick={() => {handleBetweenSets()}}
        >
          Begin next set
        </Button>

        <Box
        // TODO: add css styles here
        >
          <Countdown date={Date.now() + 179000} renderer={renderer}/>
        </Box>
        
      </ButtonGroup>;
    } else if (activeSet === finalSet) {
      buttons = <form onSubmit={handleSubmit} noValidate>
        <ButtonGroup>
          <TextField
            required
            fullWidth
            className={classes.button}
            onChange={e => setAmrapInput(parseInt(e.target.value))}
            label="amrap input"
            name="amrapInput"
            type="number"
          />
          <Button
            fullWidth
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Complete Session
          </Button>
        </ButtonGroup>
      </form>

    } else {
      buttons = <ButtonGroup>
        <Button
          fullWidth
          className={classes.button}
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
          className={classes.button}
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
