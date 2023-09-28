import React, { useState, useEffect } from 'react'
import "../styles/Compare.css"
import image1 from "../image.png";
import triple_clicked from "../triple_clicked.png"
import { authFetch } from '../auth';
import { Route } from "react-router-dom";
import Login from "../pages/Login";

const Compare = () => {
  if(localStorage.getItem("access_token") === null){
    <Route exact path = "/login" element = {<Login/>}/>
  }

    const token = localStorage.getItem('access_token');
    const [uploaded, setUploaded] = useState(null);
    const [enhanced, setEnhanced] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [zoomed_1, setZoomed_1] = useState(false);
    const [zoomed_2, setZoomed_2] = useState(false);
    const handleButtonClick = () => {
        setIsOpen(!isOpen);
      };

    const handleClick_uploaded = (e) => {

        if(!zoomed_1){
        const img = document.getElementById("simple");
        const x = e.clientX - e.target.offsetLeft - 200;
        const y = e.clientY - e.target.offsetTop - 200;

        img.style.cursor = "zoom-out";
        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = "scale(4)";
        setZoomed_1(true);
        }
        else{
            const img = document.getElementById("simple");

            img.style.cursor = "zoom-in";
            img.style.transformOrigin = `center`;
            img.style.transform = "scale(1)";
            setZoomed_1(false);
        }
    };

    const handleClick_enhanced = (e) => {
        if(!zoomed_2){
            const img = document.getElementById("enhance");
            const x = e.clientX - e.target.offsetLeft - 900;
            const y = e.clientY - e.target.offsetTop - 200;
    
            img.style.cursor = "zoom-out";
            img.style.transformOrigin = `${x}px ${y}px`;
            img.style.transform = "scale(4)";
            setZoomed_2(true);
            }
            else{
                const img = document.getElementById("enhance");
    
                img.style.cursor = "zoom-in";
                img.style.transformOrigin = `center`;
                img.style.transform = "scale(1)";
                setZoomed_2(false);
            }
    };

    useEffect(() => {
        getUploaded();
        getEnhanced();
      }, [])

    let getEnhanced = async () => {
        let response = await authFetch('http://10.1.143.113:5000/upload/predict', {
          method : 'GET',
          headers: {
            'Authorization' : `Bearer ${token}`,
          },
        });
        let data = await response.blob();
        const imageUrl = URL.createObjectURL(data);
        setEnhanced(imageUrl);
    }
    
    let getUploaded = async () => {
        let response = await authFetch('http://10.1.143.113:5000/upload/image', {
          method : 'GET',
          headers: {
            'Authorization' : `Bearer ${token}`,
          },
        });

        let data = await response.blob();
        const imageUrl = URL.createObjectURL(data);
        setUploaded(imageUrl);
    }
    
    const logout = () => {
      localStorage.setItem("access_token", null)
    }

    const username = localStorage.getItem("username");

return (
    <div className = "c_main_div">
        <h1 className = "c_h1_style">Enhance Ai</h1>
        <p className = "c_p_style">Upscale your images using Ai</p>
        <div className = "c_image_div">
            <img src = {uploaded} className = "c_image_style" id = "simple" onClick = {handleClick_uploaded} alt = "simple_image"></img>
        </div>
        <div className = "c_enhanced_div">
            <img src = {enhanced} className = "c_enhanced_style"  id = "enhance" onClick = {handleClick_enhanced} alt = "enhanced_image"></img>
        </div>
        <a href = "/enhance"><button className = "c_back">Go Back</button></a>
        <div className = "c_img_container">
          <img src = {image1} className = "c_img_style" alt = "robot_image"/>
        </div>
        <button className = "c_menu_button" onClick={handleButtonClick}><img className = "c_img_clicked" src = {triple_clicked} alt = "menu-button"></img></button>
        {isOpen && (<div className = "c_menu">
          <button className = "c_menu_button_clicked" onClick={handleButtonClick}><img className = "c_img_clicked" src = {triple_clicked} alt = "menu-button"></img></button>
          <div className = "login_info">
          <p className = "upload_username">{username}</p>
          <button className = "upload_home"><a className = "upload_home" href = "/upload">Upload</a></button>
          <button className = "upload_instr" onClick = {logout}><a className = "upload_home" href = "/">Logout</a></button>
          </div>
        </div>)}
    </div>
  )
}

export default Compare