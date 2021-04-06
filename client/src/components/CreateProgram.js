import React from 'react';
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

export default function CreateProgram() {
  const classes = useStyles();

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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel>Lifts: </FormLabel>
                <FormGroup>
                  <FormControlLabel 
                    control={<Checkbox name="Bench Press" />}
                    label="Bench Press"
                  />
                  <FormControlLabel 
                    control={<Checkbox name="Bench Press" />}
                    label="Overhead Press"
                  />
                  <FormControlLabel 
                    control={<Checkbox name="Bench Press" />}
                    label="Squat"
                  />
                  <FormControlLabel 
                    control={<Checkbox name="Bench Press" />}
                    label="Deadlift"
                  />
                  <FormControlLabel 
                    control={<Checkbox name="Bench Press" />}
                    label="Pendlay Row"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel>1RM: </FormLabel>
                <FormGroup>
                  <TextField
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    className={classes.oneRepMax}
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    className={classes.oneRepMax}
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    className={classes.oneRepMax}
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    className={classes.oneRepMax}
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormGroup>
              </FormControl>
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