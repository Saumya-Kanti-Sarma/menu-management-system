// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <head>
        <title>Welcome To Ommitus </title>
      </head>
      <h1>Welcome to the App</h1>
      <nav>
        <Link to={"/restaurant/register-restaurant"}>Register Restaurant</Link> <br />
        <Link to={"/restaurant/login"}>Login Restaurant</Link><br />
        <Link to={"/restaurant/:nameOfRestaurant/:idOfRestaurant/menu/"}>View Menu</Link><br />
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
        <Link to={"/"}></Link>
      </nav>
    </div>
  );
}

export default Home;
