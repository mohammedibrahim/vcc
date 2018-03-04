import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// State conf:
import { Provider } from 'react-redux';
import createStore from './state';

// Main Components: (no routing here, just a one page app)
import MainNavigation from './components/Navigation';
import Header from './components/Header';
import SearchBox from './containers/Search';
import Carousel from './components/Carousel';

import './App.css';

// Init redux store:
export const store = createStore();

// Global UI config:
const theme = createMuiTheme({
  palette: {
    primary: { main: '#4c4b4c' },
    secondary: { main: '#656665' }
  },
  typography: {
    fontFamily: '"Ropa Sans", sans-serif'
  },
  breakpoints: {
    keys: [ 'xs', 'sm', 'md', 'lg', 'xl' ],
    values: {
      xs: 0,
      sm: 960,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className={'main'}>
            <Header />
            <MainNavigation />
            <SearchBox />
            <Carousel />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
