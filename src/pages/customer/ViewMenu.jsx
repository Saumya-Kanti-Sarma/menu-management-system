import React from 'react';
import { useParams } from 'react-router-dom';

function ViewMenu() {
  const { idOfRestaurant } = useParams();
  return <h2>Viewing Menu for Restaurant ID: {idOfRestaurant}</h2>;
}

export default ViewMenu;
