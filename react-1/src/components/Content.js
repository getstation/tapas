import React, { useState, useEffect , useCallback } from 'react';
import { createUseStyles } from 'react-jss'
import axios from 'axios'
import Card  from './Card' 
import update from 'immutability-helper'

const useStyles = createUseStyles({
  Content: {
    width: '90%',
    minHeight: 400,
    margin: 30,
    boxShadow: '0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)',
    backgroundImage: props => props.themeGradient,
  },

  element : {
    borderStyle: 'solid',
    borderWidth: '1px',
    listStyleType: 'none'

  }
});

function Content(props) {
  const classes = useStyles(props);

  /*fetch data with axios */
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        'http://jsonplaceholder.typicode.com/users',
      );
      setIsLoading(false);
      setCards(result.data);
    };

    fetchData();
  }, []);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      )
    },
    [cards],
  )
  const renderCard = (card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        name={card.name}
        email={card.email}
        moveCard={moveCard}
      />
    )
  }
  return (
    <section className={ classes.Content} >
      <ul>
        { isLoading ? 
          <div>data loading....</div>:
          cards.map((card, i) => renderCard(card, i))}
    </ul>
    </section>
  );
}

export default Content;
