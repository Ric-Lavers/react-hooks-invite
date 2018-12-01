import React, { Component, lazy } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StripeProvider, Elements } from 'react-stripe-elements';
import './App.css'
import "./RyanFlorence/whatevs/index.css"
import { Grid, Paper } from '@material-ui/core'

import { ImagesContext } from './context'
import Form from './components/Form'
import Details from './components/Details'
// import Messages from './components/Messages'
import People from './components/People'
import Uploader from './components/Uploader'
import Music from './components/Music'
import Welcome from './components/Welcome'
import Gallery from './components/Gallery'
import Messages from './components/Messages'
import Stripe from './components/Stripe'
import CountDown from './components/CountDown'

import Modal from './components/common/Modal'
import ErrorSnackbar from './components/ErrorSnackbar'
import Spinner from './components/Spinner'

// const Gallery = lazy(() => import('./components/Gallery'))
// const Messages = lazy(() => import('./components/Messages') )

const Publishable_key = 'pk_test_h6yLt71utyPK2SJMsPxCiju1'

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
    images: [],
  }

  addImages = (images) => {
    this.setState({
      images: [ ...[].concat(images), ...this.state.images ]
    })
  }

  setModal = (title, message, actionsKey, actionName) => {
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
    let { closeModal, modalIsOpen, modalProps, images } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <ImagesContext.Provider 
          value={{
            addImages: this.addImages,
            images
          }} 
        >
          <Grid  className="App" container spacing={24} >
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                  
                    <Gallery/>
                  
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                {/* <StripeProvider apiKey={Publishable_key}>
                <div className="example">
                  
                  <Elements>
                    <Stripe/>
                    
                  </Elements>
                </div>
              </StripeProvider>
                    
                   */}
                   <CountDown/>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Paper style={{ height: '100%' }} >
                  <Details/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper style={{ height: '100%' }} >
                  <Form setSnackbar={this.setSnackbar} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Uploader
                  addImages={this.addImages}
                  setModal={this.setModal} 
                  isLoading={this.state.modalLoading
                    && (this.state.modalProps.actionName === "Upload anyways?")}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ height: '100%' }} >
                    <Messages/>
                </Paper>
              </Grid>
              <Grid item xs={12} >
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
                  message={this.state.snackbarProps.message}
                  openNum={this.state.snackbarProps.openNum}
                />


            </Grid>
        </ImagesContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
