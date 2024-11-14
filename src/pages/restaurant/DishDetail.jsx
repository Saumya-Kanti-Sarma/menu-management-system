import React from 'react'
import DishDetailComponent from '../../components/DishDetail/DishDetail.comp'


const DishDetail = () => {
  return (
    <>
      <DishDetailComponent
        DisplayEditAndDelete={"default"} DisplayAddReview={"none"}
      />
    </>
  )
}

export default DishDetail
