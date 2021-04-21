import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Program, Lift } from "../program.types";

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

export default function ProgramDisplay(props) {
  const classes = useStyles();
  // const history = useHistory();
  const programs = useSelector((state: any) => state.programs.programs)
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  
  // set currentProgram to the program with a uuid matching the url uuid parameter
  let currentProgram;
  const id = props.match.params.id
  programs.forEach((program: Program) => {
    if (":" + program.uuid === id) {
      currentProgram = program;
    }
  })

  let currentCycle = currentProgram.cycles[currentCycleIndex];
  let lifts = currentCycle.lifts;

  const isCycleAtZero: boolean = currentCycleIndex === 0;
  const isCycleAtMax: boolean = currentCycleIndex === currentProgram.cycles.length - 1;

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

        <Grid container direction="row" justify="center" alignItems="center">
          {
          isCycleAtZero? <Typography></Typography> 
          : <IconButton onClick={() => setCurrentCycleIndex(currentCycleIndex - 1)}> <ArrowLeft /> </IconButton>
          }
          <Typography>Cycle: {currentCycleIndex + 1}</Typography>
          {
          isCycleAtMax? <Typography></Typography>
          : <IconButton onClick={() => setCurrentCycleIndex(currentCycleIndex + 1)}><ArrowRight /></IconButton>
          }
        </Grid>

        {lifts.map((lift: Lift) => (
          <Container className={classes.cardGrid} key={lift.name}>
            <Typography>{lift.name}</Typography>
            <Grid container spacing={2}>
              {lift.sessions.map((session) => (
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
                        {session.sets.map((set) => (
                          <TableRow>
                            <TableCell align="justify">{set.weight}</TableCell>
                            <TableCell align="justify">{set.reps}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      
                    </Table>
                  </TableContainer>
                </Grid>
              ))}
            </Grid>
          </Container>
        ))}

      </main>
    </React.Fragment>
  );
}
