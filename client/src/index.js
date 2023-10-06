// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#6200ea', 
  //   },
  //   secondary: {
  //     main: '#f50057', 
  //   },
  //   // Add more custom colors if needed
  // },
});

const store = configureStore({
  reducer: rootReducer, // Pass the rootReducer as the "reducer" property
}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
