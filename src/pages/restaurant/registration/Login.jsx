import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import "../css/Login.css";
import axios from 'axios';

const Login = () => {
  const [displayLoader, setDisplayLoader] = useState("none");
  const [data, setData] = useState({
    restaurantName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [img, setImg] = useState("close-eye.svg"); // State to toggle password visibility

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleLogin = async () => {
    if (data.restaurantName && data.password) {
      setDisplayLoader("block");
      const toastId = toast.loading("Logging in... Please wait");
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}restaurant/login`, data);
        toast.success(`Welcome back, ${data.restaurantName}!`);
        toast.dismiss(toastId);
        setDisplayLoader("none");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to login");
        toast.dismiss(toastId);
        setDisplayLoader("none");
      }
    } else {
      toast.error("Please enter both restaurant name and password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    img == "close-eye.svg" ? setImg("open-eye.svg") : setImg("close-eye.svg");

  };

  return (
    <>
      <div className="main-reg-area">
        <div className="login-container">
          <h2>Login</h2>

          {/* Restaurant Name Input */}
          <label>Restaurant Name or Phone Number:</label>
          <input
            type="text"
            value={data.restaurantName}
            onChange={(e) => handleInputChange("restaurantName", e.target.value)}
            placeholder="Enter name of the Restaurant"
          />

          {/* Password Input with Toggle */}
          <label>Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"} // Toggle between password and text
              value={data.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="••••••"
            />
            <img
              src={"/" + img}
              alt="Toggle password visibility"
              onClick={togglePasswordVisibility}
              className="toggle-password-icon"
            />
          </div>

          {/* Login Button */}
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>

      <div className="loader-area-log" style={{ display: displayLoader }}>
        <div className="log-loader"></div>
      </div>
    </>
  );
};

export default Login;
