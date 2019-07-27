import React, { useImperativeHandle, useRef } from "react";
import { useStyles } from "./style";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const User = React.forwardRef((props, ref) => {
  const classes = useStyles(props);
  const { user, isDragging, connectDragSource, connectDropTarget } = props;
  const elementRef = useRef(null);
  connectDragSource(elementRef);
  connectDropTarget(elementRef);
  const opacity = isDragging ? 0 : 1;
  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current
  }));
  return (
    <div ref={elementRef} className={classes.User} style={{ opacity }}>
      <div className={classes.Info}>
        <div className={classes.Flex}>{user.name}</div>
        <div className={classes.Flex}>{user.email}</div>
      </div>
      <div className={classes.Icon}>
        <img className={classes.Img} src="./arrowRight.svg" alt="Station" />
      </div>
    </div>
  );
});

export default DropTarget(
  ItemTypes.User,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.moveUser(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.User,
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(User)
);
