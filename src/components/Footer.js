import React from 'react'

const Footer = () => {
    const main_div = {
        position : "relative",
        width : "100vw",
        height : "10vh",
        top : "85vh",
        backgroundColor : "black",
        textAlign : "center",
    };

    const text = {
        position : "relative",
        top : "3vh",
        color : "white",
    };

return (
    <div style = {main_div}>
      <p style = {text}>Copyright NESCOM</p>
    </div>
  )
}

export default Footer
