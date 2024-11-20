import React from 'react'
import "./Btn.comp.css"
const BtnComp = ({ text, onClick, style, activeClassName }) => {
  return (
    <>
      <button
        onClick={onClick}
        style={style}
        className={`btn-comp ${activeClassName}`}
      >{text || "text"}</button>
    </>
  )
}

export default BtnComp
