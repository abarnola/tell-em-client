import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//Components
import NavBar from './components/Navbar'

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#F2D7EE',
      main: '#A5668B',
      dark: '#69306D',
      contrastText: '#fff'
    },
    secondary: {
      main: '#6a1b9a',
    }
  }
})

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
        <NavBar />
          <div className="container"> 
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
