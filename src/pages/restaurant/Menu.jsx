import React from 'react';
import { useParams } from 'react-router-dom';
import MenuComponent from '../../components/menu/Menu.comp';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"
// /restaurant/menu/all-items/${idOfRestaurant}
///restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one/${item._id}
const Menu = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams();
  const navigate = useNavigate();

  const restaurantToken = Cookies.get("RestaurantCredentialToken");
  if (!restaurantToken) {
    navigate("/restaurant/register-restaurant");
    return;
  }
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
