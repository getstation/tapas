import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import FakeUser from './FakeUser';

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
  const [fakeUsers, setFakeUsers] = useState([]);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          setFakeUsers(result);
        },
        (error) => {
          throw error;
        }
      );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={classes.Content}>
        <ul>
          {fakeUsers.map((fakeUser, i) => (
            <FakeUser key={i} name={fakeUser.name} email={fakeUser.email}/>
          ))}
        </ul>
      </section>
    </DndProvider>
  );
}

export default Content;
