import React from 'react'

import ProfileCardComponent from '../../components/ProfileCard/ProfileCard.comp'
import ImgGridComponent from '../../components/ImgGrid/ImgGrid.comp'

import "./css/Profile.css"
const Profile = () => {
  return (
    <>
      <ProfileCardComponent />
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
