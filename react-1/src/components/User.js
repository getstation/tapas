import React, {useImperativeHandle, useRef} from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import {createUseStyles} from 'react-jss';
import ItemTypes from './ItemTypes';

const useStyles = createUseStyles({
    User: {
        minHeight: 40,
        padding: 40,
        backgroundColor: '#fff',
        color: '#949494',
        borderBottom: '1px solid #e4e4e4',
        "&:last-child": {
            borderBottom: 'inherit'
        },
        cursor: 'move'
    },
    Infos: {float: 'left'},
    UserName: {
        fontWeight: 'bold',
        fontSize: 20,
        float: 'left',
        marginBottom: 5
    },
    UserEmail: {
        textDecoration: 'none',
        color: '#949494',
        float: 'left'
    },
    Arrow: {float: 'right'}
});

const User = React.forwardRef(
    ({user, isDragging, connectDragSource, connectDropTarget}, ref) => {
        const classes = useStyles({user, isDragging, connectDragSource, connectDropTarget});
        const elementRef = useRef(null);
        const opacity = Number(!isDragging);
        connectDragSource(elementRef);
        connectDropTarget(elementRef);
        useImperativeHandle(ref, () => ({
            getNode: () => elementRef.current,
        }));
        return (
            <li className={classes.User} style={{opacity}} ref={elementRef}>
                <div className={classes.Infos}>
                    <span className={classes.UserName}>{user.name}</span>
                    <br/>
                    <a href={`mailto:${user.email}`} className={classes.UserEmail}>{user.email}</a>
                </div>
                <img src="./arrow.svg" width="42" alt="➡️" className={classes.Arrow}/>
            </li>
        )
    },
);

export default DropTarget(
    ItemTypes.USER,
    {
        hover(props, monitor, component) {
            if (!component) {
                return null
            }
            const node = component.getNode();
            if (!node) {
                return null
            }
            const dragIndex = monitor.getItem().index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = node.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            props.moveUser(dragIndex, hoverIndex);
            monitor.getItem().index = hoverIndex;
        },
    },
    connect => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(
    DragSource(
        ItemTypes.USER,
        {
            beginDrag: props => ({
                id: props.id,
                index: props.index,
            }),
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    )(User),
);
