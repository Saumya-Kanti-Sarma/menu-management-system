// src/pages/restaurant/RestaurantNavbar.jsx
import React from 'react';
import "./css/Navbar.css"
import { useParams, useNavigate } from 'react-router-dom';
function RestaurantNavbar({ ParamName, ParamImg, ParamPage }) {

  const navigate = useNavigate()
  const { nameOfRestaurant, idOfRestaurant } = useParams()
  return (
    <nav className='navbar'>
      <h1>Ommitus.com | {ParamPage}</h1>
      <h2>
        Welcome Back {ParamName}
      </h2>
      <div className='nav-profile' onClick={() => { navigate(`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/profile`) }}>
        <img src={ParamImg || "/profile.jpg"} />
        <h2>Profile</h2>
      </div>
    </nav>
  );
}

export default RestaurantNavbar;
