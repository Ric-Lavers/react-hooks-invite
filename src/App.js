import React, { Component, Fragment } from 'react'
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

class App extends Component {
  state = {
    hasError: false,
  }
  componentDidCatch(error, info){
    console.error(error)
    this.setState({ hasError: true })
    setTimeout(() => {
      this.setState({ hasError: false })
    }, 3000)
  }

  render() {
    return (
      <Fragment>
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

            {this.state.hasError && <ErrorSnackbar/>}

        </Grid>
      </Fragment>
    );
  }
}

export default App;
