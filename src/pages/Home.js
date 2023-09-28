import React from 'react'
import "../styles/Home.css"
import image1 from "../image.png";

const Home = () => {

  localStorage.setItem("access_token", null)

return (
    <div className = "home_main_div">
      <div className = "spinning_border"></div>
      <div className = "spinning_border_2"></div>
      <div className = "home_head">
      <h1 className = "home_welcome">Welcome to</h1>
      <h1 className = "home_enhance">Enhance AI</h1>
      <h3 className = "home_exp">A platform to help you enhance your images <br/> using the power of AI.</h3>
      </div>
      <div className = "home_img_container">
        <img src = {image1} className = "home_img_style" alt = "robot_image"/>
      </div>
      <button className = "home_login"><a className = "home_login" href = "/login">Login</a></button>
      <button className = "home_signup"><a className = "home_signup" href = "/signup">Sign Up</a></button>
    </div>
  )
}

export default Home