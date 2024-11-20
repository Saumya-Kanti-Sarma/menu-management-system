import React from 'react';
import { useParams } from "react-router-dom";

import ProfileCardComponent from '../../components/ProfileCard/ProfileCard.comp'
import ImgGridComponent from '../../components/ImgGrid/ImgGrid.comp'

import "./css/Profile.css";

const Profile = () => {
  const { nameOfRestaurant } = useParams()
  return (
    <>
      <ProfileCardComponent
        name={nameOfRestaurant}
      />
      <div className="profile-content-area">
        <ImgGridComponent
          heading={"COVER PHOTOS"}
          limit={3} />

        <ImgGridComponent
          heading={"HIGHLIGHTS"}
          limit={6} />
        {/* <ImgGridComponent /> */}

      </div>
    </>
  )
}

export default Profile
