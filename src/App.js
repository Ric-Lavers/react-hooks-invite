import React, { Component, lazy, Suspense, createContext } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import "./RyanFlorence/whatevs/index.css"
import { Grid, Paper } from '@material-ui/core'

import Form from './components/Form'
import Details from './components/Details'
// import Messages from './components/Messages'
import People from './components/People'
import Uploader from './components/Uploader'
import Music from './components/Music'
import Welcome from './components/Welcome'

import Modal from './components/common/Modal'
import ErrorSnackbar from './components/ErrorSnackbar'
import Spinner from './components/Spinner'

const Gallery = lazy(() => import('./components/Gallery'))
const Messages = lazy(() => import('./components/Messages') )

// const imagesContext = createContext();


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

  state = {
    modalIsOpen: false,
    modalProps: {},
    snackbarProps: {
      openNum: 1,
      message: null
    },
    modalLoading: false,
  }

  setModal = (title, message, actionsKey, actionName) => {
console.log("setModal",  actionsKey)
console.log(typeof actionsKey)
    this.setState({
      modalIsOpen: true, 
      modalProps: {
        title, message, actionFunc: actionsKey, actionName, toggleModalLoading: this.toggleModalLoading
      }
    })

  }
  closeModal = () => this.setState({ modalIsOpen: false})

  toggleModalLoading = (boolean) => {
    if ( typeof boolean !== "boolean") {
      this.setState({ modalLoading: !this.state.modalLoading })
    }else {
      this.setState({ modalLoading: boolean })
    }
  }

  setSnackbar = ( message=null ) => {
    this.setState({
      snackbarProps: {
        openNum: Math.random(),
        message,
      }
    })
  }
  
  render() {
    let { closeModal, modalIsOpen, modalProps } = this.state

    return (
      <MuiThemeProvider theme={theme}>
      <Suspense fallback={<Spinner/>}>
      <button onClick={this.setSnackbar} >set Snackbar </button>
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
                <Uploader
                  setModal={this.setModal} 
                  isLoading={this.state.modalLoading
                    && (this.state.modalProps.actionName === "Upload anyways?")}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                  <Suspense fallback={<Spinner/>} >
                    <Messages/>
                  </Suspense>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                  <People/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                  <Music/>
                </Paper>
              </Grid>
    
                <Welcome/>
                <Modal
                  close={this.closeModal}
                  open={modalIsOpen}
                  {...modalProps}
                />
                <ErrorSnackbar
                  openNum={this.state.openNum}
                />


            </Grid>
      </Suspense>
      </MuiThemeProvider>
    );
  }
}

export default App;
