import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { ProgramInputs } from "../program.types";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 0),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, weight, reps) {
  return { name, weight, reps };
}

const rows = [
  createData('Squat', 100, 5),
  createData('Bench Press', 100, 5),
  createData('Deadlift', 100, 5),
  createData('Overhead Press', 100, 5),
  createData('Pendlay Row', 100, 5),
];

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
  
  const lifts = currentProgram.lifts;
  console.log(lifts);
  const rows1 = [
    Object.keys(lifts).forEach((lift) => {
      console.log(lifts[lift].checked)
      if (lifts[lift].checked === true) {
        createData(lift, lifts[lift].oneRepMax, 5) 
      }
    })
  ];

  console.log(rows1)
 
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

        <Container className={classes.cardGrid} maxWidth="md">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="justify">Weight (lbs)</TableCell>
                  <TableCell align="justify">Reps</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="justify">{row.weight}</TableCell>
                    <TableCell align="justify">{row.reps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

      </main>
    </React.Fragment>
  );
}

