import React from 'react';
import "./Customer.css";
import DishDetailComponent from "../../components/DishDetail/DishDetail.comp.jsx";
import { useParams } from 'react-router-dom';
const MenuDetail = () => {
  const { nameOfRestaurant } = useParams();
  return (
    <>
      <div className='customer-menu-heading'>
        <h2>Welcome to {nameOfRestaurant} dishes available with us:</h2>
      </div>
      <main className='customer-menu-main'>
        <DishDetailComponent
          DisplayEditAndDelete={"none"} DisplayAddReview={"flex"}
        />
      </main>
    </>
  )
}

export default MenuDetail
