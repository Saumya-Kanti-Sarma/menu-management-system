// src/pages/restaurant/RestaurantHome.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import RestaurantNavbar from './RestaurantNavbar';

function RestaurantHome() {
  return (
    <div>
      <RestaurantNavbar />
      <Outlet /> {/* This will render child routes (like create-menu, edit-menu, etc.) */}
    </div>
  );
}

export default RestaurantHome;
