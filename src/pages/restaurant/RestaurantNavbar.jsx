// src/pages/restaurant/RestaurantNavbar.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function RestaurantNavbar() {
  const { idOfRestaurant } = useParams();

  return (
    <nav>
      <ul>
        <li><Link to={`/restaurant/view-menu/${idOfRestaurant}`}>View Menu</Link></li>
        <li><Link to={`/restaurant/edit-menu/${idOfRestaurant}/:id-of-menu`}>Edit Menu</Link></li>
        <li><Link to={`/restaurant/delete-menu/${idOfRestaurant}/:id-of-menu`}>Delete Menu</Link></li>
      </ul>
    </nav>
  );
}

export default RestaurantNavbar;
