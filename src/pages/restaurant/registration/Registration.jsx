import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import "../css/RestaurantRegistration.css";
import axios from 'axios'
import { Link } from "react-router-dom";

const Registration = () => {
  const [data, setData] = useState({
    restaurantName: "",
    password: "",
    phoneNumber: "",
    address: "",
    ownerName: "",
    type: [],
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [displayLoader, setDisplayLoader] = useState("none"); // New state for loader display

  const [primaryDisplay, setPrimarydisplay] = useState();
  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const sendOtp = () => {
    if (data.restaurantName && data.ownerName && data.phoneNumber) {
      if (data.phoneNumber.length >= 9) {
        setDisplayLoader("block"); // Show loader
        setTimeout(() => {
          setDisplayLoader("none"); // Hide loader after 2 seconds
          setIsOtpSent(true);
          toast.success("OTP sent to provided number: " + data.phoneNumber);
        }, 2000);
      } else {
        toast.error("Please provide a valid phone number");
      }
    } else {
      toast.error("Restaurant name and Owner Name are necessary");
    }
  };

  const submitOtpHandler = () => {
    if (otp === "1234") {
      toast.success("Phone number verified");
      setIsPhoneVerified(true);
      setShowAdditionalFields(true);
      setIsOtpSent(false); // Close popup
      setPrimarydisplay("none")
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleTypeChange = (type) => {
    setData((prevData) => ({
      ...prevData,
      type: prevData.type.includes(type)
        ? prevData.type.filter((t) => t !== type)
        : [...prevData.type, type],
    }));
  };

  const handleRegisterAccount = async () => {
    if (data.restaurantName && data.ownerName && data.phoneNumber && data.password && data.address) {
      const toastId = toast.loading("Creating Account..."); // Save toast ID
      // console.log(import.meta.env.VITE_BACKEND_URL);
      setDisplayLoader("block")
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurant/create-account`, data);
        toast.success(response.data.msg); // Show success message
        console.log(response.data);
        toast.dismiss(toastId)
        setDisplayLoader("none")

      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to register account"); // Show error message

        setDisplayLoader("none")
      }
    } else {
      console.log(data);
      toast.error("All Fields are required");
    }
  };
  return (
    <>
      <div className="main-reg-area">
        <div>
          <h1>Create Account with Ommitus</h1>
          <p>One of the best Restaurant Menu Management System in the World</p>
        </div>
        <div className="registration-container">
          <h2>Restaurant Registration</h2>

          {/* Restaurant Name Input */}
          <label style={{ display: primaryDisplay }}>Restaurant Name:</label>
          <input
            style={{ display: primaryDisplay }}
            type="text"
            value={data.restaurantName}
            onChange={(e) => handleInputChange("restaurantName", e.target.value)}
            placeholder="Enter restaurant name"
          />

          {/* Owner Name Input */}
          <label style={{ display: primaryDisplay }}>Owner Name:</label>
          <input
            style={{ display: primaryDisplay }}
            type="text"
            value={data.ownerName}
            onChange={(e) => handleInputChange("ownerName", e.target.value)}
            placeholder="Enter owner name"
          />

          {/* Phone Number Input */}
          <label style={{ display: primaryDisplay }}>Phone Number:</label>
          <PhoneInput
            style={{ display: primaryDisplay }}
            value={data.phoneNumber}
            defaultCountry="IN"
            onChange={(value) => handleInputChange("phoneNumber", value)}

          />

          {/* Send OTP Button */}
          {!isOtpSent && !isPhoneVerified && (
            <button onClick={sendOtp}>Send OTP</button>
          )}

          {/* OTP Popup */}
          <Popup open={isOtpSent} closeOnDocumentClick={false} modal>
            <div className="popup-content">
              <h3>Enter OTP</h3>
              <OtpInput
                inputStyle="popup-otp-input"
                value={otp}
                onChange={setOtp}
                numInputs={4}
                isInputNum
                renderInput={(props) => <input {...props} />}
              />
              <button onClick={submitOtpHandler}>Submit OTP</button>
            </div>
          </Popup>

          {/* Additional Fields After OTP Verification */}
          {showAdditionalFields && (
            <>
              <label>Password:</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="••••••"
              />
              <label>Address:</label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter address"
              />

              <label>Type:</label>
              <div className="type-options">
                {["club", "events", "family", "dhaba", "bar", "cafe"].map((type) => (
                  <div key={type}>
                    <input
                      type="checkbox"
                      checked={data.type.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    <label>{type}</label>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Register Account Button */}
          {showAdditionalFields && (
            <button className="register-account-btn" onClick={handleRegisterAccount}>
              Register Account
            </button>
          )}
        </div>
        <Link to={"/restaurant/login"} className='already-have-acc'>Already Have An Account? LOGIN</Link>
      </div>
      <div className="loader-area-reg" style={{ display: displayLoader }}>
        <div className="reg-loader">
        </div>
      </div>
    </>
  );
};

export default Registration;

{/*
  when the sent OTP btn is clicked i want you to set display loader to block for 2 sec and after that to none
  */}
