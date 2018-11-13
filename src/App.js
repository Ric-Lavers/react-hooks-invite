import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Paper } from '@material-ui/core'

import Form from './components/Form';
import Details from './components/Details';

class App extends Component {
  render() {
    return (
      <Grid  className="App" container spacing={24}  >
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
      </Grid>
    );
  }
}

export default App;
