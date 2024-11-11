import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./css/RestaurantHome.css"

const Menu = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams();
  const [newMenuData, setNewMenuData] = useState([]);
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
    <>

      {loading ? (
        <div className='menu-loader-parent'>
          <div className='def-loader menu-loades-main' ></div>
        </div>
      ) : (
        <div>
          {newMenuData && newMenuData.length > 0 ? (
            <div className='parent-menu-container'>
              <div className="menu-container">
                {newMenuData.map((item) => (
                  <div key={item._id} className="menu-item" onClick={() => navigate(`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one/${item._id}`)} >
                    <img src={item?.image} alt={item.dishName} />
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <span>{item.dishName}</span>
                        <span className="menu-item-price">${item.price}</span>
                      </div>
                      <p className="menu-item-availability" style={{ color: item.available ? "#4CAF50" : "red" }}>
                        {item.available ? "Available" : "Un-available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      )}
    </>
  )
}

export default Menu
