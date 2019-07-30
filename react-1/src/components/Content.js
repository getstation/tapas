import React, { useState, useEffect, useCallback } from "react";
import { createUseStyles } from "react-jss";
import request from "superagent";
import User from "./User";
import update from "immutability-helper";

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

  const moveUser = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = users[dragIndex];
      setUsers(
        update(users, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        })
      );
    },
    [users]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await request.get(
          "http://jsonplaceholder.typicode.com/users"
        );
        const { body } = result;
        setUsers(body);
      } catch (error) {
        // maybe retry !
      }
    };
    fetchData();
  }, []);

  const renderUser = (user, index) => {
    return (
      <User
        key={user.id}
        index={index}
        id={user.id}
        user={user}
        moveUser={moveUser}
      />
    );
  };

  return <section className={classes.Content}>{users.map(renderUser)}</section>;
};

export default Content;
