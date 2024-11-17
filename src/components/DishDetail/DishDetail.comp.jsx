import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './DishDetail.comp.css';
import Cookies from "js-cookie"
import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase storage



const DishDetailComponent = ({ DisplayEditAndDelete, DisplayAddReview }) => {

  // Get parameters from URL
  const { idOfRestaurant, idOfDish, nameOfRestaurant } = useParams();

  // State variables
  const [dish, setDish] = useState(null);
  const [availableStyle, setAvailableStyle] = useState("#4CAF50");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [AveRatings, setAveRatings] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({});
  const navigate = useNavigate();

  const [starIndex, setStarIndex] = useState(null); // Save clicked star index
  const [comment, setComment] = useState(''); // Save comment

  // Fetch dish details on component mount
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

  // Update availability style based on dish availability
  useEffect(() => {
    if (dish?.available === false) {
      setAvailableStyle("#FF4D4D");
    } else {
      setAvailableStyle("#4CAF50");
    }
  }, [dish]);

  // Fetch ratings for the dish
  useEffect(() => {
    async function fetchRatings() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/customer/ratings/all-ratings/${idOfDish}`
        );
        setRatings(response.data.data);
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      }
    }
    fetchRatings();
  }, [idOfDish]);


  // get average ratings 
  useEffect(() => {
    async function fetchAverageRatings() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/ratings/average-stars/${idOfDish}`)
      if (response.status >= 200 && response.status < 300) {
        setAveRatings(response.data.averageStars);
      }
      console.log(AveRatings);
    }
    fetchAverageRatings();
  }, [idOfDish])

  // Handle dish deletion with confirmation
  const handleDeleteDish = async () => {
    const storage = getStorage();
    const imgRef = ref(storage, dish.image)
    toast((t) => (
      <span>
        Dish item will be permanently deleted. Are you sure?
        <br />
        <div className='notification-btn'>
          <button
            className='btn edit-btn'
            onClick={() => {
              console.log(imgRef)
              deleteObject(imgRef)
                .then(() => {
                  toast.promise(
                    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/delete-menu/${idOfDish}`),
                    {
                      loading: 'Deleting...',
                      success: 'Dish deleted successfully!',
                      error: 'Failed to delete dish',
                      duration: 800,
                    }
                  )
                    // .then(() => navigate(`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu`))
                    .catch((error) => {
                      toast.error("Cannot delete now... please check the console and try again later", { duration: 800, });
                      console.log(error);
                    });
                }).catch((error) => { toast.error("Firebase error... Please report this error"); console.log(error) })

            }}
          >
            Yes
          </button>
          <button className="btn delete-btn" onClick={() => toast.dismiss(t.id)}>
            No
          </button>
        </div>
      </span>
    ));
  };

  // Handle review deletion with confirmation
  const handleDeleteReview = async (reviewId) => {
    toast((t) => (
      <span>
        Review will be permanently deleted. Are you sure?
        <br />
        <div className='notification-btn'>
          <button
            className='btn edit-btn'
            onClick={() => {
              toast.promise(
                axios.delete(`${import.meta.env.VITE_BACKEND_URL}/customer/ratings/delete-review/${reviewId}`),
                {
                  loading: 'Deleting...',
                  success: 'Review deleted successfully!',
                  duration: 1000,
                  error: 'Failed to delete review, try again later',
                }
              )
                .then(() => window.location.reload())
                .catch((error) => {
                  toast.error("Cannot delete now... please check the console and try again later", { duration: 1000, });
                  console.log(error);
                });
            }}
          >
            Yes
          </button>
          <button className="btn delete-btn" onClick={() => toast.dismiss(t.id)}>
            No
          </button>
        </div>
      </span>
    ));
  };

  // Toggle dish availability status
  const handleToggleAvailability = async () => {
    const toastID = toast.loading("Saving changes...");
    setTimeout(async () => {
      try {
        const updateData = { available: !dish.available }; // Toggle availability
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/edit-menu/${idOfDish}`, updateData);
        toast.dismiss(toastID);
        toast.success(response.data.message);
        setTimeout(() => window.location.reload(), 400);
      } catch (error) {
        toast.dismiss(toastID);
        toast.error("Failed to update availability.");
      }
    }, 1000);
  };

  // Toggle review expansion (Read more / Show less)
  const handleToggleReview = (ratingId) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [ratingId]: !prevState[ratingId],
    }));
  };

  // Render loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;



  const handleSubmit = async () => {
    // Set the collected data
    const customerID = Cookies.get("customerID");
    const userName = Cookies.get("customerName");
    const reviewData = {
      review: comment,
      customerName: userName,
      stars: starIndex,
    };

    if (customerID == undefined || userName == undefined) {
      Cookies.set("RestaurantURL", `/customer/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one/${idOfDish}`)
      toast((t) => (
        <span style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "5px" }}>
          <p>please Sign-up to continue</p> <br />
          <button className='btn edit-btn'
            onClick={() => {
              navigate("/customer/register-account");
              toast.dismiss(t.id);
              console.log(reviewData);

            }
            }
          >SIGN-UP</button>
        </span>
      ))
    }

    else {

      const toastID = toast.loading("Adding your feedback...");
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/ratings/add-review/${idOfDish}/${customerID}`, reviewData);
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 400);
        console.log('Review submitted successfully:', response.data);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);

      }
      finally {
        toast.dismiss(toastID);
      }
    }
  };

  const handleStarClick = (index) => {
    setStarIndex(index + 1); // Update clicked star index
  };


  return (
    <>
      {/* Dish Detail Section */}
      <div className="dish-detail-container">
        <div className="dish-image-section">
          <img src={dish.image || "placeholder-image.jpg"} alt={dish.name} className="dish-image" />
        </div>
        <div className="dish-info-section">
          <h2 className="dish-name">
            {dish.dishName}
            <span className="dish-availability" style={{ color: availableStyle }}>
              | {dish.available ? "Available" : "Not Available"}
            </span>
          </h2>
          <p className="dish-price">₹{dish.price}/-</p>
          <p className="dish-description">{dish.description}</p>
          <div className="dish-rating">{"★".repeat(AveRatings || 0) || "Ratings un-available"}</div>

          <div className="dish-actions" style={{ display: DisplayEditAndDelete }}>
            <button className="btn unavailable-btn" onClick={handleToggleAvailability}>
              {dish.available ? "Make Unavailable" : "Make Available"}
            </button>
            <button className="btn delete-btn" onClick={handleDeleteDish}>Delete</button>
          </div>

          {/* Add review area */}
          <div className="add-review" style={{ display: DisplayAddReview }}>
            <section className="add-review-stars-area">
              <p>Rate Stars:</p>
              {"★".repeat(5).split('').map((star, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  style={{
                    color: index < starIndex ? '#FFA500' : '#0000006c', // Change color of clicked and previous stars
                    cursor: 'pointer',
                    fontSize: '24px',
                  }}
                >
                  {star}
                </span>
              ))}
            </section>

            <section className="add-review-review-area">
              <textarea
                name="review"
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Update comment
                placeholder="Your Feedback Is Very Important To Us..."
              />
              <button className="btn edit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </section>
          </div>
        </div>
      </div>
      <br />

      {/* Customer Reviews Section */}
      <div className="dish-detail-container res-ratings-area">
        <h1>Customer Reviews:</h1>
        {ratings && ratings.length > 0 ? (
          ratings.map((rating) => (
            <>

              <div className="review-parent">
                <section>
                  <div key={rating._id} className="reviews">
                    <div className='review-child'>
                      <img src={rating.customerProfile || "/profile.jpg"} alt="profile" className="profile-image" />
                      <div>
                        <b>{rating.customerName || "Name"}</b>
                        <p>
                          {expandedReviews[rating._id]
                            ? rating.review
                            : `${rating.review.split(" ").slice(0, 35).join(" ")}...`}
                          {rating.review.split(" ").length > 50 && (
                            <button className="readmore" onClick={() => handleToggleReview(rating._id)}>
                              {expandedReviews[rating._id] ? "Show less" : "Read more"}
                            </button>
                          )}
                        </p>
                      </div>
                    </div>


                  </div>
                  <div className="dish-rating ">{"★".repeat(rating.stars)}</div>
                </section>
                <button className="btn delete-btn" onClick={() => handleDeleteReview(rating._id)} style={{ display: DisplayEditAndDelete }}>Delete</button>
              </div>
            </>
          ))
        ) : (
          <b style={{ margin: "10px", display: 'flex', justifyContent: "center" }}>
            Oops! No ratings available to show..
          </b>
        )}
      </div>
    </>
  )
}

export default DishDetailComponent
