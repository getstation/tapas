import React from "react";
import { createUseStyles } from "react-jss";
import Content from "./components/Content";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const useStyles = createUseStyles({
  "@global": {
    body: {
      backgroundColor: "whitesmoke"
    }
  },
  App: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%"
  }
});

function App(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.App}>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Content />
      </DndProvider>
    </div>
  );
}

export default App;
