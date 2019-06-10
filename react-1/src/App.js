import React from 'react';
import { createUseStyles } from 'react-jss'
import Content from './components/Content';
import Header from './components/Header';

const useStyles = createUseStyles({
  '@global': {
    body: {
      backgroundColor: 'whitesmoke',
    }
  },
  App: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  }
});

function App(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.App}>
      <Header/>
      <Content/>
    </div>
  );
}

export default App;
