// src/pages/restaurant/RestaurantNavbar.jsx
import React from 'react';
import "./css/Navbar.css"
function RestaurantNavbar({ ParamName, ParamImg, ParamPage }) {

  return (
    <nav className='navbar'>
      <h1>Ommitus.com | {ParamPage}</h1>
      <h2>
        Welcome Back {ParamName}
      </h2>
      <div className='nav-profile'>
        <img src={ParamImg || "/profile.jpg"} />
        <h2>Profile</h2>
      </div>
    </nav>
  );
}

export default RestaurantNavbar;
