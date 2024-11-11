import React, { useState } from 'react';
import "./css/CreateMenu.css";
import { useParams } from 'react-router-dom';
import { storage } from '../../utils/Firebase.js';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateMenu = () => {
  const { idOfRestaurant } = useParams();
  const [image, setImage] = useState(null);
  const [loaderDisplay, setLoaderDisplay] = useState("none");

  const [data, setdata] = useState({
    dishName: "",
    image: "",
    price: "",
    available: true,
  });

  const handleSave = async () => {

    const loadingToast = toast.loading("Adding up menu, please wait...")
    try {
      setdata((prevData) => ({ ...prevData, available: true }));
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/add-menu/${idOfRestaurant}`, data);
      toast.success("Menu added successfully!");
      setTimeout(() => {
        window.location.reload()
      }, 800)
    } catch (error) {
      toast.error("Failed to add menu.");
      console.log(error);

    } finally {
      toast.dismiss(loadingToast)
    }
  };

  const handleDraft = async () => {
    const loadingToast = toast.loading("Adding up menu, please wait...")
    try {
      setdata((prevData) => ({ ...prevData, available: false }))
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/add-menu/${idOfRestaurant}`, data);
      toast.success("Draft saved successfully!");
      setTimeout(() => {
        window.location.reload()
      }, 800)
    } catch (error) {
      toast.error("Failed to save draft.");
      console.log(error);

    }
    finally {
      toast.dismiss(loaderDisplay)
    }
  };

  const handleInputChange = (field, value) => {
    setdata({ ...data, [field]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoaderDisplay("block")
      // upload the file to fireabse 
      const storageRef = ref(storage, `images/${file.name}`); // Define the storage path
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          // Get the download URL after upload
          getDownloadURL(snapshot.ref).then((url) => {
            setdata((prevData) => ({ ...prevData, image: url })); // Update image URL in data
            setImage(url);
          });
        })
        .catch((error) => {
          toast.error("Failed to upload image.");
          console.error("Error uploading image:", error);
        })
        .finally(() => {
          setLoaderDisplay("none")
        })
    }
  };
  return (
    <div className="container">
      <div className="form">
        <div className="image-upload">
          <label htmlFor="imageInput">
            {image ? (
              <img src={image} alt="Dish" className="dish-image" />
            ) : (
              <div className="placeholder">Upload an image of your dish</div>
            )}
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ opacity: '0', position: "absolute", background: "red", height: "100%", width: "100%", cursor: "pointer" }}
          />
          <div className='def-loader createMenuLoader' style={{ display: loaderDisplay }}></div>
        </div>
        <input
          type="text"
          placeholder="name of dish"
          className='upload-img-input'
          value={data.dishName}
          onChange={(e) => handleInputChange("dishName", e.target.value)}
        />
        <input
          type="number"
          placeholder="price in INR"
          className='upload-img-input'
          value={data.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
        <div className="buttons">
          <button className="save-button createMenu-btns" onClick={handleSave}>Save</button>
          <button className="draft-button createMenu-btns" onClick={handleDraft}>Draft</button>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
