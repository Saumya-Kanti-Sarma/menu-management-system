import React from 'react'
import { useParams } from 'react-router-dom'
import MenuComponent from '../../components/menu/Menu.comp'
import "./Customer.css"
const ViewMenu = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams()
  return (
    <>
      <div className='customer-menu-heading'>
        <h2>Welcome to {nameOfRestaurant} <br /> dishes available with us:</h2>
      </div>
      <main className='customer-menu-main'>
        <MenuComponent
          onclickURL={`/customer/${nameOfRestaurant}/${idOfRestaurant}/menu/get-one`}
          mainUrl={`/restaurant/menu/${idOfRestaurant}&available=true`} />
      </main>
    </>
  )
}

export default ViewMenu
