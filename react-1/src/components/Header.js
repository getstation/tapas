import { GradientType, withGradient } from '@getstation/theme';
import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  Header: {
    backgroundImage: props => props.themeGradient,
    height: 60,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2em',
    width: '100%',
  },
});

function Header(props) {
  const classes = useStyles(props);
  return (
    <header className={classes.Header}>
      Station challenge: React 1
    </header>
  );
}

export default withGradient(GradientType.withDarkOverlay)(Header);
