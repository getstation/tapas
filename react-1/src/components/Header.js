import { GradientType, withGradient } from '@getstation/theme';
import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  Header: {
    background: 'linear-gradient(to top,#130cb7,#44B8DD)',
    height: 60,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    fontSize: '2em',
    width: '100%',
  },
  text: {
    marginLeft: '10%'
  },
  logo:{
    width: 100,
    height: 28,
    filter: 'brightness(100)'
  }
});

function Header(props) {
  const classes = useStyles(props);
  return (
    <header className={classes.Header}>
      <p className={ classes.text }>
      <img src='https://station-website.cdn.prismic.io/station-website%2F56c6c214-38ea-4449-bba2-93f9b7807c0e_logo-station-blue.svg' 
        alt='station'
        className={classes.logo}  />
      </p>
    </header>
  );
}

export default withGradient(GradientType.withDarkOverlay)(Header);
