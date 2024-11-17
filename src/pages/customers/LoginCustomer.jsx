import React from 'react'
import RegisterComponent from '../../components/Registration/Register.comp'

const LoginCustomer = () => {
  return (

    <>
      <head>
        <title>
          User Login | Ommitus
        </title>
      </head>
      <RegisterComponent
        heading={"Login back with Ommitus"}
        fetchURL={"/customer/login"}
        fetchType={"post"}
        btnTxt={"Login"}
        userNameDisplay={"none"}
        linkTxt={"don't have an account... Register?"}
        link={"/customer/register-account"}
      />
    </>
  )
}

export default LoginCustomer
