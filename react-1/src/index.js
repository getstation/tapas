import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserXThemeProvider, GradientProvider } from '@getstation/theme';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserXThemeProvider>
    <GradientProvider themeColors={['#6BB7EA', '#61ACE4', '#4E96D5', '#286AAE']}>
      <App />
    </GradientProvider>
  </BrowserXThemeProvider>,
  document.getElementById('root')
);
