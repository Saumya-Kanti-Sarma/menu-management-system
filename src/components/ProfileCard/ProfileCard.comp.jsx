import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import "./ProfileCard.comp.css";
import BtnComp from '../BTN/Btn.comp';
import axios from "axios";

const ProfileCardComponent = ({ img, name, description }) => {
  const { idOfRestaurant } = useParams();
  const [displayPopup, setDisplayPopup] = useState("none")
  // References
  const restaurantRef = useRef(null);
  const ownerRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const aboutRef = useRef(null);

  const [data, setData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phoneNumber: "",
    about: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, ref) => {
    if (e.key === "Enter" && ref.current) {
      ref.current.focus();
    }
  };

  const handleSubmit = async () => {
    console.log(data);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/restaurant/update/${idOfRestaurant}`,
        data
      );
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  const handleClosePopup = () => {
    setDisplayPopup((prev) => (prev == "none" ? "" : "none"))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurant/get-info/${idOfRestaurant}`);
        setData((prevData) => ({
          ...prevData,
          ...response.data.restaurantDetails,
        }));
        console.log(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idOfRestaurant]);

  return (
    <>
      <section id='profile-card'>
        <img src={img || "/profile.jpg"} id="profle-card-img" />
        <aside id='profile-card-aside'>
          <span id='profile-name'>
            <h2>{name || "Name of restaurant"}</h2>
            <BtnComp text={"EDIT"} onClick={handleClosePopup} />
          </span>
          <p id='profile-description'>
            <span>ABOUT</span> <br />
            {description || "Lorem ipsum dolor,sit amet consectetur adipisicing elit. Deleniti necessitatibus architecto molestiae quia suscipit quasi, animi a, doloremque illum repellendus temporibus id sint omnis corporis aliquam porro ducimus nihil voluptatum dolores officiis minima quibusdam nam recusandae dolorem! Officiis, quas harum excepturi ipsa id consectetur dignissimos pariatur cupiditate rerum deleniti quos!"}
          </p>
        </aside>
      </section>
      <div className='popup' onClick={handleClosePopup} style={{ display: displayPopup }}>
        <section className='popup-child' onClick={(e) => { e.stopPropagation() }}>
          <span>
            <p>Restaurant Name:</p>
            <input
              className="input-popup-child"
              name='restaurantName'
              value={data.restaurantName}
              onChange={handleChange}
              placeholder='Enter restaurant name here'
              onKeyDown={(e) => handleKeyDown(e, ownerRef)}
              autoFocus
              type='text'
              ref={restaurantRef}
            />
          </span>
          <span>
            <p>Owner Name:</p>
            <input
              className="input-popup-child"
              name='ownerName'
              value={data.ownerName}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, phoneNumberRef)}
              ref={ownerRef}
              placeholder='Enter owner name'
              type='text'
            />
          </span>
          <span>
            <p>Phone Number:</p>
            <input
              className="input-popup-child"
              name='phoneNumber'
              value={data.phoneNumber}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              ref={phoneNumberRef}
              type='text'
              placeholder='Enter phone number'
            />
          </span>
          <span>
            <p>Email:</p>
            <input
              className="input-popup-child"
              name='email'
              value={data.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, aboutRef)}
              placeholder='Enter Email'
              type='email'
              ref={emailRef}
            />
          </span>
          <span>
            <p>About:</p>
            <textarea
              name='about'
              value={data.about}
              onChange={handleChange}
              placeholder='About'
              ref={aboutRef}
              onKeyDown={(e) => handleKeyDown(e, restaurantRef)}
              className='input-popup-child paragraph-input-popup'
            />
          </span>
          <BtnComp
            text={"Submit"}
            style={{
              width: "50%",
              height: "60px",
              fontSize: "20px",
            }}
            onClick={handleSubmit}
          />
        </section>
      </div>
    </>
  );
};

export default ProfileCardComponent;
