import React from 'react'
import RegisterComponent from '../../components/Registration/Register.comp'

const RegisterCustomer = () => {
  return (
    <>
      <head>
        <title>
          Ommitus | Customer Registration
        </title>
      </head>
      <RegisterComponent
        heading={"Register account with Ommitus"}
        btnTxt={"Register"}
        fetchURL={"/customer/create-account"}
        fetchType={"post"}
        linkTxt={"already have an account... Login?"}
        link={"/customer/login-account"}
      />
    </>
  )
}

export default RegisterCustomer
