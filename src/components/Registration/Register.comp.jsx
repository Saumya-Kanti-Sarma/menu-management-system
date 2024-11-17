import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Corrected import
import "./Auth.css";
import toast from "react-hot-toast"

const RegisterComponent = ({ heading, btnTxt, userNameDisplay, linkTxt, link, fetchURL, fetchType }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Saving changes... Please wait");
    try {

      const response = await axios[fetchType](`${import.meta.env.VITE_BACKEND_URL}${fetchURL}`, formData); // Add your backend URL here
      if (response.status >= 200 && response.status <= 300) {
        toast.success(response.data.message);
        toast.dismiss(toastID);
        console.log(response.data);
        Cookies.set("customerID", response.data.credentials._id);
        Cookies.set("customerName", response.data.credentials.name);
        setTimeout(() => {
          navigate(`${Cookies.get("RestaurantURL")}`)
        }, 400);
      }
      else if (response.status == 300) {
        toast.error(response.data.message);
        toast.dismiss(toastID);
      }
      else {
        toast.error(response.data.message);
        toast.dismiss(toastID);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      toast.dismiss(toastID);
    }
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    const toastID = toast.loading("Saving changes... Please wait");
    try {
      // Decode the token to extract user information
      const decodedToken = jwtDecode(credentialResponse.credential);
      const updatedFormData = {
        name: decodedToken.name,
        email: decodedToken.email,
        password: decodedToken.email, // Generating a password here
      };
      // Perform the API request with the updated form data
      const response = await axios[fetchType](`${import.meta.env.VITE_BACKEND_URL}${fetchURL}`, updatedFormData);
      toast.success(response.data.message);
      toast.dismiss(toastID);
      console.log(response.data); // Log the updated form data
      Cookies.set("customerID", response.data.credentials._id);
      Cookies.set("customerName", response.data.credentials.name);
      setTimeout(() => {
        navigate(`${Cookies.get("RestaurantURL")}`)
      }, 400);

    } catch (error) {
      if (error.response.data.message === "email already registered. Please login.") {
        // initiate login...
        const decodedToken = jwtDecode(credentialResponse.credential);
        const updatedFormData = {
          email: decodedToken.email,
          password: decodedToken.email,
        };
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/login`, updatedFormData);
        toast.success(response.data.message);
        toast.dismiss(toastID);
        console.log(response.data); // Log the updated form data
        Cookies.set("customerID", response.data.credentials._id);
        Cookies.set("customerName", response.data.credentials.name);

        setTimeout(() => {
          navigate(`${Cookies.get("RestaurantURL")}`);
        }, 400);
      } else {
        toast.error(error.response.data.message);
        toast.dismiss(toastID)
      }
    }

  };


  const handleGoogleError = () => {
    console.error("Google login failed");
    alert("Google login failed!");
  };

  const handleKeyDown = (e, ref) => {
    if (e.key === "Enter" && ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className="auth-container-parent">
      <div className="auth-container">
        <section>
          <h2>{heading}</h2>
          <div className="form-submit">
            <input
              type="text"
              name="name"
              style={{ display: userNameDisplay }}
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              ref={usernameRef}
              required
              autoFocus
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              ref={emailRef}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                ref={passwordRef}
                required
              />
              <img
                src={showPassword ? "/open-eye.svg" : "/close-eye.svg"} // Replace with your icons
                alt="Toggle visibility"
                className="toggle-password-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>{btnTxt}</button>
          </div>
          <br />
          <h2>Or</h2>
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
        </section>
        <Link to={link}>{linkTxt}</Link>
      </div>
    </div>
  );
};

export default RegisterComponent;
