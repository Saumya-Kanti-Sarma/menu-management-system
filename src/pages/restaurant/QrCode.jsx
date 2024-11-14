import React from 'react'
import QRCode from "react-qr-code";
import { useParams, Link } from 'react-router-dom';
const QrCode = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams();
  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>QR Code for your restaurant menu:</h1> <br />
      <div style={{
        backgroundColor: "white",
        padding: "15px",
        border: "none",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center"
      }}>
        <QRCode
          value={`https://ommitus.netlify.app/customer/menu/${nameOfRestaurant}/${idOfRestaurant}`}
          style={{
            backgroundColor: "white",
            padding: "15px",
            border: "2px solid black",
            borderRadius: "12px",
            boxShadow: "0 0 10px 0 #00000057"

          }}
        />
      </div>
      <Link to={`/customer/menu/${nameOfRestaurant}/${idOfRestaurant}`} style={{ display: "flex", justifyContent: "center" }}>Visit Menu</Link>
    </>
  )
}

export default QrCode
