import React, { useState, useEffect } from 'react';
import "./Aside.css";
import { Link, useParams, useLocation } from 'react-router-dom';

const AsideBar = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams();
  const location = useLocation();

  const [menuActive, setMenuActive] = useState("");
  const [dishActive, setDishActive] = useState("");
  const [availableActive, setAvailableActive] = useState("");
  const [unavailableActive, setUnavailableActive] = useState("");
  const [QrActive, setQrActive] = useState("");

  useEffect(() => {
    // Check the current path and set the active state accordingly
    if (location.pathname === `/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu`) {
      setMenuActive("active");
      setQrActive("")
      setDishActive("");
      setAvailableActive("");
      setUnavailableActive("");

    } else if (location.pathname === `/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/create-menu/${idOfRestaurant}`) {
      setMenuActive("");
      setDishActive("active");
      setQrActive("")
      setAvailableActive("");
      setUnavailableActive("");
    } else if (location.pathname === `/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/available/true`) {
      setMenuActive("");
      setDishActive("");
      setAvailableActive("active");
      setQrActive("")
      setUnavailableActive("");
    } else if (location.pathname === `/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/available/false`) {
      setMenuActive("");
      setDishActive("");
      setAvailableActive("");
      setUnavailableActive("active");
      setQrActive("")
    }
    else if (location.pathname === `/restaurant/${nameOfRestaurant}/${idOfRestaurant}/get-qr-code`) {
      setMenuActive("");
      setDishActive("");
      setAvailableActive("");
      setUnavailableActive("");
      setQrActive("active")
    }
  }, [location.pathname, nameOfRestaurant, idOfRestaurant]);

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="header">
          <h2>Dashboard</h2>
        </div>
        <div className="aside-menu">
          <ul>
            <li className={`menu-item-li ${menuActive}`}>
              <Link to={`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu`} className="menu-link">
                <span>Menu</span>
              </Link>
            </li>
            <li className={`menu-item-li ${dishActive}`}>
              <Link to={`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/create-menu/${idOfRestaurant}`} className="menu-link">
                <span>Add Dish</span>
              </Link>
            </li>
            <li className={`menu-item-li ${availableActive}`}>
              <Link to={`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/available/true`} className="menu-link">
                <span>Available</span>
              </Link>
            </li>
            <li className={`menu-item-li ${unavailableActive}`}>
              <Link to={`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/available/false`} className="menu-link">
                <span>Un-Available</span>
              </Link>
            </li>
            <li className={`menu-item-li ${QrActive}`}>
              <Link to={`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/get-qr-code`} className="menu-link">
                <span>Get QR</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AsideBar;
