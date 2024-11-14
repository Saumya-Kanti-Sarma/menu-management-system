import React from 'react';
import { useParams } from 'react-router-dom';
import MenuComponent from '../../components/menu/Menu.comp';
const Available = () => {
  const { nameOfRestaurant, idOfRestaurant, available } = useParams();

  return (
    <>
      <MenuComponent
        mainUrl={`/restaurant/menu/${idOfRestaurant}&available=${available}`}
        onclickURL={`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one`}
      />
    </>
  )
}

export default Available
