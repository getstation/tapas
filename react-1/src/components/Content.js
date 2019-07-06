import React from 'react';
import { createUseStyles } from 'react-jss';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import UserList from './UserList.js'

const useStyles = createUseStyles({
  Content: {
    width: '80%',
    height: 700,
    margin: 60,
    backgroundImage: props => props.themeGradient,
    overflow: 'auto',
    borderRadius: 15,
    boxShadow: { x: 0, y: 1, color: '#cccccc', blur: 20 }, 
    '&::-webkit-scrollbar': {
    display: 'none'
    }
  }
});

function Content(props) {
  const classes = useStyles(props);
  return (
      <DndProvider backend={HTML5Backend}>
        <section className={classes.Content}>
            <UserList/>
        </section>
      </DndProvider>
  );
}

export default Content;
