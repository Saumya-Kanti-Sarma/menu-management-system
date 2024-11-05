import React from 'react';
import { useParams } from 'react-router-dom';

function DeleteMenu() {
  const { idOfRestaurant } = useParams();
  return <h2>Deleting Menu for Restaurant ID: {idOfRestaurant}</h2>;
}

export default DeleteMenu;
