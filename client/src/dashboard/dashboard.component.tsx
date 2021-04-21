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
import { Program } from '../programs/program.types';

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
            {programs.map((program: Program) => (
              <Grid item key={program.title} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {program.title}
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
