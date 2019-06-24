import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  Header: {
    backgroundImage: 'linear-gradient(0deg, #1410B8 0%, #4ED8E4 100%)',
    height: 91,
    color: 'white',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    fontSize: '2em',
    width: '100%',
    paddingLeft: 120,
  },
});

function Header(props) {
  const classes = useStyles(props);
  return (
    <header className={classes.Header}>
      <img src="./station-logo-white.svg" alt="Station"/>
    </header>
  );
}

export default Header;
