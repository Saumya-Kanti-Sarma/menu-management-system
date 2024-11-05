// src/pages/customer/CustomerNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CustomerNavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/customer/view-profile">View Profile</Link></li>
        <li><Link to="/customer/edit-details">Edit Details</Link></li>
      </ul>
    </nav>
  );
}

export default CustomerNavbar;
