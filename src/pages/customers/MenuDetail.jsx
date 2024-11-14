import React from 'react';
import "./Customer.css";
import DishDetailComponent from "../../components/DishDetail/DishDetail.comp.jsx";
import { useParams } from 'react-router-dom';
const MenuDetail = () => {
  const { nameOfRestaurant } = useParams();
  return (
    <>
      <div className='customer-menu-heading'>
        <h2>| {nameOfRestaurant} |</h2>
      </div>
      <main className='customer-menu-detail-main'>
        <DishDetailComponent
          DisplayEditAndDelete={"none"} DisplayAddReview={"flex"}
        />
      </main>
    </>
  )
}

export default MenuDetail
