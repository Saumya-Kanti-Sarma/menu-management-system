// src/pages/restaurant/RestaurantHome.jsx
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import RestaurantNavbar from './RestaurantNavbar';
import "./css/RestaurantHome.css"
import AsideBar from '../../components/AsideBar';

function RestaurantHome() {

  const { nameOfRestaurant } = useParams();

  return (
    <>
      <RestaurantNavbar ParamName={nameOfRestaurant} ParamPage={"Restaurant"} />
      <div className="res-parent-wraper">
        <aside className='res-aside'>
          <AsideBar />
        </aside>

        <main className='res-main'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default RestaurantHome;
