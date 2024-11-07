import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './css/DishDetail.css';

function DishDetail() {
  const { idOfRestaurant, idOfDish } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/get-one/${idOfRestaurant}/${idOfDish}`
        );
        setDish(response.data.data); // Assuming response data structure { success: true, data: {...} }
      } catch (error) {
        setError("Failed to load dish data");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [idOfRestaurant, idOfDish]);

  const handleDeleteDish = async () => {
    const confirmDelete = window.confirm("Dish item will be permanently deleted. Are you sure?");
    if (confirmDelete) {
      toast.promise(
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/delete-menu/${idOfDish}`),
        {
          loading: 'Deleting...',
          success: 'Dish deleted successfully!',
          error: 'Failed to delete dish',
        }
      )
        .then(() => navigate('/restaurant-menu')) // Redirect after deletion
        .catch(err => console.error("Error deleting dish:", err));
    }
  };

  const handleToggleAvailability = async () => {
    try {
      const updateData = { available: !dish.available }; // Toggle availability
      toast.loading("Saving changes...");
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/edit-menu/${idOfDish}`, updateData);

      if (response.data.success) {
        setDish((prevDish) => ({ ...prevDish, available: !prevDish.available })); // Update state
        toast.dismiss();
        toast.success("Dish availability updated!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update availability.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="dish-detail-container">
        <div className="dish-image-section">
          <img src={dish.image || "placeholder-image.jpg"} alt={dish.name} className="dish-image" />
        </div>
        <div className="dish-info-section">
          <h2 className="dish-name">
            {dish.dishName} | <span className="dish-availability">{dish.available ? "Available" : "Not Available"}</span>
          </h2>
          <p className="dish-price">₹{dish.price}/-</p>
          <p className="dish-description">{dish.description}</p>
          <div className="dish-rating">
            {"★".repeat(dish.rating || 4)}
          </div>
          <div className="dish-actions">
            <button className="btn edit-btn">Edit</button>
            <button className="btn unavailable-btn" onClick={handleToggleAvailability}>
              {dish.available ? "Make Unavailable" : "Make Available"}
            </button>
            <button className="btn delete-btn" onClick={handleDeleteDish}>Delete</button>
          </div>
        </div>
      </div>
      <br />
      <div className="dish-detail-container res-ratings-area">
        <h1>Customer Reviews:</h1>
        <div className="reviews">
          <div>
            <img src="/profile.jpg" alt="profile" />
            <p>This is the rating of the dish <button className="readmore">read more...</button></p>
          </div>
          <button className="btn delete-btn">Delete</button>
        </div>
      </div>
    </>
  );
}

export default DishDetail;
