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
}));

interface Lift {
  name: string;
  label: string;
  unit: string;
  default: string;
};

interface LiftsFormState {
  [liftName: string]: {
    checked: boolean;
    oneRepMax: number;
  };
};

interface TextFormState {
  title: string;
  cycles: number;
};

const lifts: Lift[] = [
  {
    name: "squat",
    label: "Squat",
    unit: "lbs",
    default: "100",
  },
  {
    name: "benchPress",
    label: "Bench Press",
    unit: "lbs",
    default: "100",
  },
  {
    name: "deadlift",
    label: "Deadlift",
    unit: "lbs",
    default: "100",
  },
  {
    name: "overheadPress",
    label: "Overhead Press",
    unit: "lbs",
    default: "100",
  },
  {
    name: "pendlayrow",
    label: "Pendlay Row",
    unit: "lbs",
    default: "100",
  }
];

const initTextFormState = (): TextFormState => {
  const state: TextFormState = {
    title: null,
    cycles: 0
  }
  return state;
};

const initLiftsFormState = (lifts: Lift[]): LiftsFormState  => {
  const state: LiftsFormState = {};
  lifts.forEach((lift) => {
    state[lift.name] = {
      checked: false,
      oneRepMax: 0
    }
  })
  return state;
};

export default function CreateProgram() {
  const classes = useStyles();

  const [textFormState, setTextFormState] = useState<TextFormState>(initTextFormState());

  const [liftsFormState, setLiftsFormState] = useState<LiftsFormState>(initLiftsFormState(lifts));

  const handleTitleChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...textFormState,
      title: e.target.value
    }
    setTextFormState(newState);
    console.log(newState);
  }

  const handleCyclesChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...textFormState,
      cycles: e.target.valueAsNumber
    }
    setTextFormState(newState);
    console.log(newState);
  }

  const handleLiftCheckboxChange = (liftName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...liftsFormState,
      [liftName]: {
        ...liftsFormState[liftName],
        checked: e.target.checked,
        oneRepMax: e.target.checked ? liftsFormState[liftName].oneRepMax : 0
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

  const handleSubmit = () => {
    const submitFormState = {
      ...textFormState,
      ...liftsFormState
      }
      console.log(submitFormState);
      return submitFormState
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Program
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                onChange={handleTitleChange()}
                label="Program name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleCyclesChange()}
                label="Number of cycles"
                name="numberOfCycles"
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              {lifts.map((lift: Lift) => (
              
                <FormGroup>
                  <FormControl component="fieldset" className={classes.formControl} key={lift.name}>
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
                
              ))}
            </Grid>

            <Grid item xs={12} sm={6}>
              {lifts.map((lift: Lift) => (
                <FormGroup> 
                  <FormControl component="fieldset" className={classes.formControl} key={lift.name}>
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
              ))}
            </Grid>

          </Grid>
          <Button
            onClick={() => handleSubmit()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>

        </form>
      </div>
    </Container>
  );
}

  // REVIEW
  // practice verbal understanding of syntax
  // TypeScript generics
  // square brackets vs dot notation for objects

/* TODO:

Individual lift checkbox comps?

*/