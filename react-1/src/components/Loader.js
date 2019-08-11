import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    '@keyframes ringrotate': {
        from: {
            transform: "rotateZ(0deg)",
            webkitTransform: "rotateZ(0deg)",
        },
        to: {
            transform: "rotateZ(360deg)",
            webkitTransform: "rotateZ(360deg)",
        }
    },
    Loader: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        position: "relative",
        display: "inline-flex",
        boxSizing: "border-box",
        WebkitBoxSizing: "border-box",
        animation: "$ringrotate 0.75s infinite linear",
        WebkitAnimation: "$ringrotate 0.75s infinite linear",
        "&:after": {
            content: "\"\"",
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            border: "5px solid #CFD8DC",
            boxSizing: "border-box",
            WebkitBoxSizing: "border-box",
            zIndex: "1",
            transformOrigin: "center"
        },
        "&:before": {
            content: "\"\"",
            position: "absolute",
            top: "100%",
            left: "25%",
            width: "50%",
            height: "10%",
            border: "3px solid #00B8D4",
            boxSizing: "border-box",
            WebkitBoxSizing: "border-box",
            zIndex: "1",
            transformOrigin: "center"
        }
    }
});

function Loader(props) {
  const classes = useStyles(props);
  return (
      <div className={classes.Loader}></div>
  );
}

export default Loader;
