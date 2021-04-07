import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  oneRepMax: {
    marginTop: theme.spacing(1),
  },
}));

interface Lift {
  name: string;
  title: string;
  unit: string;
  default: string;
};

export default function CreateProgram() {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);

  const lifts: Lift[] = [
    {
      name: "deadlift",
      title: "Deadlift",
      unit: "lbs",
      default: "100"
    },
    {
      name: "squat",
      title: "Squat",
      unit: "lbs",
      default: "100"
    },
    {
      name: "benchPress",
      title: "Bench Press",
      unit: "lbs",
      default: "100"
    },
    {
      name: "overheadPress",
      title: "Overhead Press",
      unit: "lbs",
      default: "100"
    },
    {
      name: "row",
      title: "Row",
      unit: "lbs",
      default: "100"
    }
  ];

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
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="programName"
                label="Program name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="numberOfCycles"
                label="Number of cycles"
                name="numberOfCycles"
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              {lifts.map((lift: Lift) => (
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                    control={
                      <Checkbox
                        name={lift.name}
                        checked={checked} 
                        onClick={handleClick}
                      />
                    }
                    label={lift.title}
                    />
                  </FormGroup>
                </FormControl>
              ))}
            </Grid>

            <Grid item xs={12} sm={6}>
              {lifts.map((lift: Lift) => (
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup> 
                    <TextField
                        className={classes.oneRepMax}
                        id="standard-number"
                        type="number"
                        placeholder="1RM (lbs)"
                      />
                  </FormGroup>
                </FormControl>
              ))}
            </Grid>

          </Grid>
          <Button
            href="dashboard"
            type="submit"
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


/* TODO:

Fix the lift label changing color
Disable 1RM inputs if lift is not selected
Event handlers for storing everything in state

*/