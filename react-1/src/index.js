import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserXThemeProvider, GradientProvider } from '@getstation/theme';
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
ReactDOM.render(
  <BrowserXThemeProvider>
    <GradientProvider themeColors={['#6BB7EA', '#61ACE4', '#4E96D5', '#286AAE']}>
      <DndProvider backend={HTML5Backend}>
					<App />
				</DndProvider>
    </GradientProvider>
  </BrowserXThemeProvider>,
  document.getElementById('root')
);
