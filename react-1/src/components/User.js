import React, { useRef } from 'react'
import { createUseStyles } from 'react-jss';
import { useDrag, useDrop } from 'react-dnd'

const useStyles = createUseStyles({
    User: {
        borderBottom: '2px solid #dddddd',
        padding: '0.5rem 1rem',
        backgroundColor: 'whitesmoke',
        color: 'grey',
        textAlign: 'left',
        paddingLeft: '50px',
        transitionDuration: '1s',
    },
    Name: {
        marginBottom: 0,
    },
    Email: {
        marginTop: 10,
    },
    Arrow: {
        marginTop: -10,
        float: 'right',
        textAlign: 'right',
        opacity: 0.4,
        height: 30,
        width: 30,
        transitionDuration: '0.5s',
        transform: 'rotate(0deg)',
    },
    ArrowClicked: {
        marginTop: -10,
        float: 'right',
        textAlign: 'right',
        opacity: 0.4,
        height: 30,
        width: 30,
        transitionDuration: '0.5s',
        transform: 'rotate(90deg)',
    }
});

const User = ({ props, id, index, moveCard, clicked, onClickUser, userInfo }) => {
    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: 'user',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Exchange cards now
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'user', id, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const classes = useStyles(props);

    return (
        <div onClick={() => onClickUser(index)} ref={ref} className={classes.User} style={{ opacity }}>
            <h3 className={classes.Name}>{userInfo.name}</h3>
            <img alt=">" src="./right-arrow.svg" className={clicked ? classes.ArrowClicked : classes.Arrow} />
            <p className={classes.Email}>{userInfo.email}</p>
            {clicked && <p>Phone: {userInfo.phone}</p>}
            {clicked && <p>Website: {userInfo.website}</p>}
        </div>
    )
}
export default User