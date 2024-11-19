import React from 'react'
import "./ProfileCard.comp.css"
const ProfileCardComponent = ({ img, name, description }) => {
  return (
    <>
      <section id='profile-card'>
        <img src={img || "/profile.jpg"} id="profle-card-img" />
        <aside id='profile-card-aside'>
          <span id='profile-name'>
            <h2>{name || "Name of restaurant"}</h2>
            <b>EDIT</b>
          </span>
          <p id='profile-description'>
            <p>ABOUT</p>
            {description || "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus hic voluptates, quia facere sint magnam alias quod perspiciatis reiciendis, asperiores voluptas! Distinctio saepe eaque voluptatum sunt dolores officia nisi voluptate id nihil, dolor quis cupiditate dolore, totam ea tempora numquam doloremque expEDITa incidunt nobis, necessitatibus culpa quasi debitis ullam? Cum."} <b>EDIT</b>
          </p>
        </aside>
      </section>
    </>
  )
}

export default ProfileCardComponent
