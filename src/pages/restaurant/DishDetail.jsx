import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/DishDetail.css';

function DishDetail() {
  const { idOfRestaurant, idOfDish } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      console.log(idOfRestaurant, idOfDish);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/get-one/${idOfRestaurant}/${idOfDish}`
        );
        setDish(response.data.data); // Assuming response data structure { success: true, data: {...} }
        console.log("Fetched dish data:", response.data.data);

      } catch (error) {
        console.error("Error fetching dish data:", error);
        setError("Failed to load dish data");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [idOfRestaurant, idOfDish]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dish-detail-container">
      <div className="dish-image-section">
        <img src={dish.image || "placeholder-image.jpg"} alt={dish.name} className="dish-image" />
      </div>
      <div className="dish-info-section">
        <h2 className="dish-name">
          {dish.name} | <span className="dish-availability">{dish.available ? "available" : "not-available"}</span>
        </h2>
        <p className="dish-price">₹{dish.price}/-</p>
        <p className="dish-description">{dish.description}</p>
        <div className="dish-rating">
          {"★".repeat(dish.rating || 4)}
        </div>
        <div className="dish-actions">
          <button className="btn edit-btn">edit</button>
          <button className="btn unavailable-btn">un-available</button>
          <button className="btn delete-btn">delete</button>
        </div>
      </div>
      <div className="related-items">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="related-item">
            <span className="item-placeholder"></span>
            <button className="btn delete-item-btn">delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishDetail;
