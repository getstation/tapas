import React from 'react';
import { ItemTypes } from '../Constants';
import { useDrag } from 'react-dnd';

function FakeUser(userData) {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.FAKEUSER },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })

  return (
    <li ref={drag}>
      <div>{userData.name}</div>
      <div>{userData.email}</div>
    </li>
  );
};

export default FakeUser;