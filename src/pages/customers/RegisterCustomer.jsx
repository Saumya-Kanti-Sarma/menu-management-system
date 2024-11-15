import React, { useState } from 'react';
import Cookies from "js-cookie";
import { GoogleLogin } from '@react-oauth/google';

import { jwtDecode } from "jwt-decode";
const RegisterCustomer = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "", // Assuming you want to manually set this, as Google login doesn't return a password.
  });

  return (
    <div>
      RegisterCustomer
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // Set the customer UUID as a cookie
          Cookies.set("customerUUID", credentialResponse.credential);

          // Decode the token to extract user information
          const decodedToken = jwtDecode(credentialResponse.credential);
          setData({
            ...data,
            name: decodedToken.name,
            email: decodedToken.email,
          });

          // console.log(data);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <p>{data.name}</p>
    </div>
  );
};

export default RegisterCustomer;
