// src/pages/restaurant/RestaurantHome.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import RestaurantNavbar from './RestaurantNavbar';
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./css/RestaurantHome.css"

function RestaurantHome() {
  const { nameOfRestaurant, idOfRestaurant } = useParams();
  const [newMenuData, setNewMenuData] = useState([null]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const navigate = useNavigate();

  useEffect(() => {
    const restaurantToken = Cookies.get("RestaurantCredentialToken");
    if (!restaurantToken) {
      navigate("/restaurant/register-restaurant");
      return;
    }

    // Fetch data of the restaurant to get all items
    const fetchData = async () => {
      setLoading(true); // Show loading text
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/all-items/${idOfRestaurant}`
        );

        if (response.status >= 200 && response.status < 300) {
          setNewMenuData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
        toast.error("Failed to load menu data");
      } finally {
        setLoading(false); // Hide loading text after data is fetched
      }
    };

    fetchData();
  }, [idOfRestaurant, navigate]);

  return (
    <div>
      <RestaurantNavbar />
      <Outlet />
      <p>Restaurant Name: {nameOfRestaurant}</p>
      <p>Restaurant ID: {idOfRestaurant}</p>

      {loading ? (
        <p>Loading menu data...</p>
      ) : (
        <div>
          {newMenuData && newMenuData.length > 0 ? (
            <div className="menu-container">
              {newMenuData.map((item) => (
                <div key={item._id} className="menu-item" onClick={() => navigate(`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one/${item._id}`)}>
                  <img src={item.image} alt={item.dishName} />
                  <div className="menu-item-content">
                    <div className="menu-item-header">
                      <span>{item.dishName}</span>
                      <span className="menu-item-price">${item.price}</span>
                    </div>
                    <p className="menu-item-availability">
                      Available: {item.available ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantHome;
