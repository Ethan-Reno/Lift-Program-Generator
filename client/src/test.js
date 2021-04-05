import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
import { ButtonGroup } from '@material-ui/core';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #333, #999)',
    border: 0,
    borderRadius: 15,
    marginBottom: 15,
    color: 'white',
    padding: '0 30px'
  }
})

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}>Test styled button</Button>
}

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 24,
    }
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <div className="App">
          <header className="App-header">
          <AppBar>
            <Toolbar>
              <Button>Login</Button>
            </Toolbar>
          </AppBar>
            <Typography variant="h2">
              Welcome to MUI test
            </Typography>
            <ButtonStyled />

            <Grid container spacing={2} justify="center">
              <Grid item>
                <Paper style={{height:75, width:50}} />
              </Grid>
              <Grid item>
                <Paper style={{height:75, width:50, marginBottom:15}} />
              </Grid>
              <Grid item>
                <Paper style={{height:75, width:50}} />
              </Grid>
            </Grid>

            <ButtonGroup>
              <Button href="#" size="large" onClick={() => alert('Hello')}variant="contained" color="primary">
                Hello
              </Button>
              <Button href="#" size="large" onClick={() => alert('World')} variant="contained" color="secondary">
                World
              </Button>
            </ButtonGroup>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
