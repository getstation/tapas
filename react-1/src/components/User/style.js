import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  User: {
    width: "100%",
    height: 150,
    backgroundColor: "#ffffff",
    borderBottomStyle: "solid",
    borderWidth: 1,
    borderColor: "#bcbcbc",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "grab"
  },
  Info: {
    height: "100%",
    width: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 50
  },
  Icon: {
    height: "100%",
    width: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  Flex: {
    display: "flex",
    margin: 5
  },
  Img: {
    height: 60
  }
});
