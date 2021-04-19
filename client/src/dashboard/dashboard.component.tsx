import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
})); 

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const programs = useSelector((state: any) => state.programs.programs)

  const handleRedirect = (path: string) => {
    history.push({ pathname: path} )
  }
 

//      TEST UTILS


  const programsTest = useSelector((state: any) => state.programs.programs)
  const currentProgram = programsTest[0];
  
  const roundWeight = (value, interval) => {
    return Math.round(value/interval) * interval;
  };

  const createProgram = (programInputs) => {
    // for each program, create cycles
    let programTest1 = {
      uuid: programInputs.uuid,
      title: programInputs.title,
      smallestInc: programInputs.smallestInc,
      cycles: createCycles(programInputs)
    }
    console.log(programTest1);
    return programTest1;
  };
  
  const createCycles = (programInputs) => {
    let cycles = [];
    for (let i = 0; i < programInputs.cycles; i ++) {
        cycles = [
          ...cycles,
          {lifts: createLift(programInputs)}
      ]
    }
    return cycles;
  };
  
  const createLift: any = (programInputs) => {
    let lifts = [];
    Object.entries(programInputs.lifts).forEach((lift: any) => {
      if (lift[1].checked === true) {
        lifts = [
          ...lifts,
          {
            name: lift[0],
            sessions: (createSession(lift[1].oneRepMax))
          }
        ]
      }
    })
    return lifts;
  };

   
  const createSession = (oneRepMax) => {
    let sessionCount = 4;

    let setValues = [
      [
        [5, 5, 5, 5, 5, 0],
        [.40, .45, .55, .65, .75, .85]
      ],
      [
        [5, 5, 5, 5, 3, 0],
        [.40, .50, .60, .70, .80, .90]
      ],
      [
        [5, 5, 5, 3, 3, 0],
        [.40, .50, .60, .75, .85, .95]
      ],
      [
        [5, 5, 5, 5, 5, 5],
        [.40, .45, .50, .55, .65, .65]
      ]
    ]

    let sessions = []
    for (let i=0; i < sessionCount; i ++) {
      sessions = [
        ...sessions,
        {
          sets: (createSet(oneRepMax, setValues[i]))
        }
      ]
    }
    return sessions;
  };
  
  const createSet = (oneRepMax, setValues) => {
    let setCount = 6;

    let sets = [];
    for (let i=0; i < setCount; i ++) {
      sets = [
        ...sets,
        {
          reps: setValues[0][i],
          weight: setValues[1][i]
        }
      ]
    }
    return sets;
    // loop to create 6 sets per session
    // where sets = key-value pairs of weigh - rep count?
  }
  
  createProgram(currentProgram);

// END TEST UTILS



  return (
    <React.Fragment>
      <CssBaseline />
      <main>

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Programs
            </Typography>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {programs.map((program) => (
              <Grid item key={program} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {program.title}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Cycles: {program.cycles}
                    </Typography>                    
                  <CardActions>
                    <ButtonGroup>
                      <Button 
                        size="small"
                        onClick={() => {handleRedirect(`/programs/:${program.uuid}`)}}
                      >
                        View
                      </Button>
                      <Button size="small">Delete</Button>
                    </ButtonGroup>
                  </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {handleRedirect("/create")}}
          >
            Create New
          </Button>
        </Container>

      </main>
    </React.Fragment>
  );
}
