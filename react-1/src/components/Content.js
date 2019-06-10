import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  Content: {
    width: '90%',
    minHeight: 400,
    margin: 30,
    backgroundImage: props => props.themeGradient,
  }
});

function Content(props) {
  const classes = useStyles(props);
  return (
    <section className={classes.Content}>
      Here goes your lists
    </section>
  );
}

export default Content;
