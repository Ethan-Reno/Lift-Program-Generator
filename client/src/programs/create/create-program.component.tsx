import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { LiftType, LiftsFormState, ProgramInputs } from "../program.types";
import { lifts } from '../program.lifts';
import { addProgram } from '../programs.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
  },
  oneRepMax: {
    marginTop: theme.spacing(1),
  },
  selectFormControl: {
    margin: theme.spacing(1),
    midWidth: 120,
  },
}));

// Initialize object to hold the state of lifts in the form
const initLiftsFormState = (lifts: LiftType[]): LiftsFormState  => {
  const state: LiftsFormState = {};
  
  // loop through each lift in the lift array
  lifts.forEach((lift) => {
    state[lift.name] = { 
      checked: false,
      oneRepMax: 0,
      cycleIncrement: 0
    }
  })
  return state;

  /* expected output is an object of objects
    {
      deadlift: {
        checked: false,
        oneRepMax: 0
        roundNumber: 0
      },
      {...}
    }
  */
};

export default function CreateProgram() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [cycles, setCycles] = useState(0);
  const [roundNumber, setRoundNumber] = useState(0);
  const [liftsFormState, setLiftsFormState] = useState<LiftsFormState>(initLiftsFormState(lifts));
  const dispatch = useDispatch();

  const handleLiftCheckboxChange = (liftName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: LiftsFormState = {
      ...liftsFormState,
      [liftName]: {
        ...liftsFormState[liftName],
        checked: e.target.checked,
        oneRepMax: e.target.checked ? liftsFormState[liftName].oneRepMax : 0,
        cycleIncrement: e.target.checked ? liftsFormState[liftName].cycleIncrement : 0,
      }
    }
    setLiftsFormState(newState);
  }

  const handleLiftOneRepMaxChange = (liftName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: LiftsFormState = {
      ...liftsFormState,
      [liftName]: {
        ...liftsFormState[liftName],
        oneRepMax: e.target.valueAsNumber
      }
    }
    setLiftsFormState(newState);
  }

  const handleCycleIncrementChange = (liftName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: LiftsFormState = {
      ...liftsFormState,
      [liftName]: {
        ...liftsFormState[liftName],
        cycleIncrement: e.target.valueAsNumber
      }
    }
    setLiftsFormState(newState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uuid = uuidv4();

    const programInputs: ProgramInputs = {
      uuid: uuid,
      title: title,
      cycles: cycles,
      lifts: {...liftsFormState},
      roundNumber: roundNumber
    };
    /*try {
        const res = await fetch('http://localhost:5000/programs', {
          method: 'POST',
          body: programInputs,
          headers: {'Content-Type': 'application/json' },
        })
        const data = await res.json()
      } */
    dispatch(addProgram(programInputs));
    navigate({pathname: "/dashboard"});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Program
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={e => setTitle(e.target.value)}
                label="Program name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={e => setCycles(parseInt(e.target.value))}
                label="Number of cycles"
                name="numberOfCycles"
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e: any) => setRoundNumber(e.target.value)}
                  label="Round lift values to the nearest..."
                  name="weightIncrement"
                  type="number"
                  InputProps={ { inputProps: { min: 0 }} }
                />
            </Grid>

            {lifts.map((lift: LiftType) => (
              <React.Fragment key={lift.name}>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleLiftCheckboxChange(lift.name)}
                          checked={liftsFormState[lift.name].checked}
                        />
                      }
                      label={lift.label}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                      
                <Grid item xs={12} sm={3}>
                  <FormGroup> 
                    <FormControl component="fieldset" className={classes.formControl}>
                      <Input
                          className={classes.oneRepMax}
                          onChange={handleLiftOneRepMaxChange(lift.name)}
                          value={liftsFormState[lift.name].oneRepMax}
                          type="number"
                          disabled={!liftsFormState[lift.name].checked}
                          endAdornment={<InputAdornment position="end">lb</InputAdornment>}
                        />
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormGroup> 
                    <FormControl component="fieldset" className={classes.formControl}>
                      <Input
                          className={classes.oneRepMax}
                          onChange={handleCycleIncrementChange(lift.name)}
                          value={liftsFormState[lift.name].cycleIncrement}
                          type="number"
                          disabled={!liftsFormState[lift.name].checked}
                          endAdornment={<InputAdornment position="end">lb</InputAdornment>}
                        />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </React.Fragment>
            ))}

          </Grid>
          <Grid item xs={12}>
            <ButtonGroup fullWidth>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                className={classes.submit}
                onClick={() => navigate({pathname: "/dashboard"})}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>

        </form>
      </div>
    </Container>
  );
}
