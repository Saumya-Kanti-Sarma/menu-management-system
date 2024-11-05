import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/customer/register">Customer Register</Link><br /> <br />
      <Link to="/customer/login">Customer Login</Link><br /> <br />
      <Link to="/restaurant/register-restaurant">Restaurant Register</Link><br /> <br />
      <Link to="/restaurant/login">Restaurant Login</Link><br /> <br />
      <Link to="/restaurant/create-menu/1">Restaurant Home</Link><br /> <br />
    </nav>
  );
}

export default Navbar;
