// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from "react-toastify"
import Home from './pages/Home';
import CustomerHome from './pages/customer/CustomerHome';
import CustomerRegister from './pages/customer/Register';
import CustomerLogin from './pages/customer/Login';
import CustomerViewMenu from './pages/customer/ViewMenu';

// restaurant routes
import Registration from './pages/restaurant/registration/Registration.jsx';
import RestaurantHome from './pages/restaurant/RestaurantHome';
import Login from './pages/restaurant/registration/Login.jsx';

import NotFound from './pages/NotFound';
import CreateMenu from './pages/restaurant/CreateMenu';
import DishDetail from './pages/restaurant/DishDetail.jsx';
import Menu from './pages/restaurant/Menu.jsx';
import Available from './pages/restaurant/Available.jsx';

function App() {
  return (
    <>
      <Toaster />
      <ToastContainer />
      <Router>
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<Home />} />

          {/* Customer Routes */}
          <Route path="customer/register" element={<CustomerRegister />} />
          <Route path="customer/login" element={<CustomerLogin />} />
          <Route path="/customer" element={<CustomerHome />}>
            <Route path="view-menu/:idOfRestaurant" element={<CustomerViewMenu />} />
          </Route>

          {/* Restaurant Routes */}
          <Route path="/restaurant/register-restaurant" element={<Registration />} />
          <Route path="/restaurant/login" element={<Login />} />

          <Route path="/restaurant/:nameOfRestaurant/:idOfRestaurant" element={<RestaurantHome />} >
            <Route path="menu/" element={<Menu />} />
            <Route path="menu/get-one/:idOfDish" element={<DishDetail />} />
            <Route path="menu/create-menu/:idOfRestaurant" element={<CreateMenu />} />
            <Route path="menu/available/:available" element={<Available />} />
            {/* <Route path="delete-menu/:idOfRestaurant/:idOfMenu" element={<DeleteMenu />} /> */}
          </Route>

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
