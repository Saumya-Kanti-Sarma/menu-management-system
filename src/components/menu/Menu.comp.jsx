import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast";
import "./menu.comp.css"

const MenuComponent = ({ mainUrl, onclickURL }) => {
  const [newMenuData, setNewMenuData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const navigate = useNavigate();

  useEffect(() => {

    // Fetch data of the restaurant to get all items
    const fetchData = async () => {
      setLoading(true); // Show loading text
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}${mainUrl}`
        );

        if (response.status >= 200 && response.status < 300) {
          setNewMenuData(response.data.data);
        }
      } catch (error) {
        console.error(`${import.meta.env.VITE_BACKEND_URL}${mainUrl}`);
        console.error("Error fetching menu data:", error);
        toast.error("Failed to load menu data");
      } finally {
        setLoading(false); // Hide loading text after data is fetched
      }
    };

    fetchData();
  }, [navigate]);
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
                  <div key={item._id} className="menu-item" onClick={() => navigate(`${onclickURL}/${item._id}`)} >
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

export default MenuComponent
