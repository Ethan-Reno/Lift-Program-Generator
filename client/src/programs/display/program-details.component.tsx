import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { ProgramInputs } from "../program.types";
import { sessions } from '../program.lifts';

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
}));

export default function Program(props) {
  
  const classes = useStyles();
  // const history = useHistory();
  const programs = useSelector((state: any) => state.programs.programs)
  
  // set currentProgram to the program with a uuid matching the url uuid parameter
  let currentProgram;
  const id = props.match.params.id
  programs.forEach((program: ProgramInputs) => {
    if (":" + program.uuid === id) {
      currentProgram = program;
    }
  })

  let currentCycle = currentProgram.cycles[0];
  console.log(currentCycle.lifts);


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              {currentProgram.title}
            </Typography>
          </Container>
        </div>

        {/* {activeLifts.map((lift) => (
          <Container className={classes.cardGrid}>
            <Typography>{lift.name}</Typography>
            <Grid container spacing={2}>
              {sessions.map((session) => (
                <Grid item lg={3}>
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
                            <TableCell align="justify">{lift.oneRepMax * session.setValues.one}</TableCell>
                            <TableCell align="justify">{session.repValues.one}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="justify">{lift.oneRepMax * session.setValues.two}</TableCell>
                            <TableCell align="justify">{session.repValues.two}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="justify">{lift.oneRepMax * session.setValues.three}</TableCell>
                            <TableCell align="justify">{session.repValues.three}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="justify">{lift.oneRepMax * session.setValues.four}</TableCell>
                            <TableCell align="justify">{session.repValues.four}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="justify">{lift.oneRepMax * session.setValues.five}</TableCell>
                            <TableCell align="justify">{session.repValues.five}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="justify">{lift.oneRepMax * session.setValues.six}</TableCell>
                            <TableCell align="justify">{session.repValues.six}</TableCell>
                          </TableRow>
                      </TableBody>

                    </Table>
                  </TableContainer>
                </Grid>
              ))}
            </Grid>
          </Container>
        ))} */}
      </main>
    </React.Fragment>
  );
}
