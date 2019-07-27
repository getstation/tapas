import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import request from "superagent";
import User from "./User";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
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

  const moveUser = (dragIndex, hoverIndex) => {
    const dragCard = users[dragIndex];
    setUsers(
      update(users, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
      })
    );
  };

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
      <DndProvider backend={HTML5Backend}>
        {users.map((user, i) => (
          <User user={user} index={i} moveUser={moveUser} />
        ))}
      </DndProvider>
    </section>
  );
};

export default Content;
