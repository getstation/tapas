import React from "react";
import { useStyles } from "./style";

export default props => {
  const classes = useStyles(props);
  const { user } = props;
  return (
    <div className={classes.User}>
      <div className={classes.Info}>
        <div className={classes.Flex}>{user.name}</div>
        <div className={classes.Flex}>{user.email}</div>
      </div>
      <div className={classes.Icon}>
        <img className={classes.Img} src="./arrowRight.svg" alt="Station" />
      </div>
    </div>
  );
};
