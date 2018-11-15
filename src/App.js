import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import "./RyanFlorence/whatevs/index.css"
import { Grid, Paper } from '@material-ui/core'

import Form from './components/Form'
import Details from './components/Details'
import Messages from './components/Messages'
import People from './components/People'
import Uploader from './components/Uploader'
import Gallery from './components/Gallery'
import Welcome from './components/Welcome'
import ErrorSnackbar from './components/ErrorSnackbar'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#A239CA',
      contrastText: '#E7DFDD'
    },
    secondary: {
      main: '#4717F6',
      contrastText: '#0E0B16'
    },
  }
})


class App extends Component {
  
  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <Grid  className="App" container spacing={24} >
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                  <Gallery/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper style={{ height: '100%' }} >
                  <Details/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper style={{ height: '100%' }} >
                  <Form/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Uploader/>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                  <Messages/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                  <People/>
                </Paper>
              </Grid>
              
              <Welcome/>

          </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
