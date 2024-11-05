// src/pages/customer/CustomerHome.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

function CustomerHome() {
  return (
    <div>
      <CustomerNavbar />
      <Outlet /> {/* This will render child routes (like register, login, etc.) */}
    </div>
  );
}

export default CustomerHome;
