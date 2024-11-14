import React from 'react';
import { useParams } from 'react-router-dom';
import MenuComponent from '../../components/menu/Menu.comp';
// /restaurant/menu/all-items/${idOfRestaurant}
///restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one/${item._id}
const Menu = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams();

  return (
    <>
      <MenuComponent
        mainUrl={`/restaurant/menu/all-items/${idOfRestaurant}`}
        onclickURL={`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one`}
      />
    </>
  )
}

export default Menu
