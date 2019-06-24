import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    element : {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      listStyleType: 'none',
      width: '85%'

  
    },
    text : {
      marginLeft: '60px',
      color: 'rgba(0,0,0,0.4)',
      marginTop: '30px'
      
    },
    mail : {
      marginLeft: '60px',
      color: 'rgba(0,0,0,0.4)',
      marginTop: '-10px',
      fontSize:'12px'
    },
    arrow : {
      marginLeft: '60px',
      color: 'rgba(0,0,0,0.4)',
      fontSize: '41px',
      
      
      
    },
    block: {
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid',
      borderBottomColor:'rgba(0,0,0,.14)',

    }
  });


const Card = ({ id, email, index, moveCard, name }) => {
  const classes = useStyles()
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
 
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top


      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0: 1
  drag(drop(ref))
  return (
    <div 
      className={classes.block}
      ref={ref}
      style={ { opacity } }>
        <div  
            className={ classes.element }
            >
          <h4 className={ classes.text }> { name } </h4>
          <p className={ classes.mail }>{email}</p>
        
        </div>
        <div>
            <p className={ classes.arrow }> > </p>
          </div>
          
    </div>
  )
}
export default Card
