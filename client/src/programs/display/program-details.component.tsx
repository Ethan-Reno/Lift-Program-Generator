import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Grid, 
  Button,
  Paper, 
  Container, 
  CssBaseline, 
  Typography, 
  IconButton } from '@material-ui/core';
import { ArrowRight, ArrowLeft, Done, Clear } from '@material-ui/icons';
import { Program, Lift, Session, Set } from "../program.types";

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
  const history = useHistory();
  const programs = useSelector((state: any) => state.programs.programs) // any type for now, until I figure out how I want to type the redux state

  // set currentProgram to the program with a uuid matching the url uuid parameter
  let currentProgram;
  const id = props.match.params.id
  programs.forEach((program: Program) => {
    if (":" + program.uuid === id) {
      currentProgram = program;
    }
  })

  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  let currentCycle = currentProgram.cycles[currentCycleIndex];
  let lifts = currentCycle.lifts;

  const isCycleAtZero: boolean = currentCycleIndex === 0;
  const isCycleAtMax: boolean = currentCycleIndex === currentProgram.cycles.length - 1;
  const isSessionComplete: boolean = false; //import state from session component
  const sessionIndicies: number[] = [];
  for (let i = 0; i < 4; i ++) {
    sessionIndicies.push(i);
  }

  const handleRedirect = (path: string) => {
    history.push( {pathname: path} )
  }

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
          isCycleAtZero? <IconButton> <ArrowLeft/> </IconButton>
          : <IconButton onClick={() => setCurrentCycleIndex(currentCycleIndex - 1)}> <ArrowLeft /> </IconButton>
          }
          <Typography>Cycle: {currentCycleIndex + 1}</Typography>
          {
          isCycleAtMax? <IconButton> <ArrowRight/> </IconButton>
          : <IconButton onClick={() => setCurrentCycleIndex(currentCycleIndex + 1)}><ArrowRight /></IconButton>
          }
        </Grid>
  
        {lifts.map((lift: Lift) => (
          <Container className={classes.cardGrid} key={lift.name}>
            <Typography>{lift.name}</Typography>
            <Grid container spacing={2}>
              {lift.sessions.map((session: Session) => (
                <Grid item lg={3}>
                  <TableContainer component={Paper} key={session.number}>
                    <Table aria-label="simple table">
                    
                      <TableHead>
                        <TableRow>
                          <TableCell align="justify">Weight (lbs)</TableCell>
                          <TableCell align="justify">Reps</TableCell>
                        </TableRow>
                      </TableHead>
  
                        {session.sets.map((set: Set) => (
                          <TableBody>
                            <TableRow>
                              <TableCell align="justify">{set.weight}</TableCell>
                              <TableCell align="justify">{set.reps}</TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      
                    </Table>
                  </TableContainer>
                  
                  
                    {session.complete? 
                      <Grid container direction="row">
                        <Button 
                          size="small"
                          variant="outlined"
                          onClick={() => {handleRedirect(`/programs/:${currentProgram.uuid}/:${currentCycleIndex}/:${lift.name}/:${session.number}`)}}
                        >
                          Repeat session
                        </Button>
                        {/* TODO: Icon overlapping */}
                        <Done color="primary" />
                      </Grid>
                    : 
                      <Grid container direction="row">
                        <Button 
                          size="small"
                          variant="outlined"
                          onClick={() => {handleRedirect(`/programs/:${currentProgram.uuid}/:${currentCycleIndex}/:${lift.name}/:${session.number}`)}}
                        >
                          Start session
                        </Button>
                        <Clear color="secondary" />
                      </Grid>
                    }
  
                </Grid>
              ))}
            </Grid>
          </Container>
        ))}
  
      </main>
    </React.Fragment>
  );
}
