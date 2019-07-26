import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import request from "superagent";
import User from "./User";

const useStyles = createUseStyles({
  Content: {
    width: "80%",
    minHeight: 400,
    height: 700,
    margin: 50,
    overflow: "scroll",
    backgroundImage: props => props.themeGradient
  }
});

const Content = props => {
  const classes = useStyles(props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    request
      .get("http://jsonplaceholder.typicode.com/users")
      .end((error, result) => {
        // maybe a retry system
        if (!error) {
          const { body } = result;
          setUsers(body);
        }
      });
  }, []);
  return (
    <section className={classes.Content}>
      {users.map((user, key) => (
        <User user={user} key={key} />
      ))}
    </section>
  );
};

export default Content;
