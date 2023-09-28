import React from 'react'
import { useState, useEffect } from "react"
import { saveAs } from "file-saver"
import image1 from "../image.png";
import triple_clicked from "../triple_clicked.png";
import "../styles/Enhance.css";
import { authFetch } from '../auth';
import { Route } from "react-router-dom";
import Login from "../pages/Login";

const Enhance = (props) => {
  if(localStorage.getItem("access_token") === null){
    <Route exact path = "/login" element = {<Login/>}/>
  }
  const token = localStorage.getItem('access_token');
  const filename = localStorage.getItem('filename')
  console.log(filename);
  let [image, setImage] = useState('');

  useEffect(() => {
    getUploaded();
  }, [])

  let getUploaded = async () => {
    let response = await authFetch('http://10.1.143.113:5000/upload/predict', {
      method : 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    });
    let data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setImage(imageUrl);
  } 

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDownload = () => {
    saveAs(image, filename.slice(0, -4) + "_out.jpg");
  };

  const logout = () => {
    localStorage.setItem("access_token", null)
  }

  const username = localStorage.getItem("username");

  return (
    <body>
      {console.log(token)}
      <div className = "e_div1_style">
        <h1 className = "e_h1_style">Enhance Ai</h1>
        <p className = "e_p_style">Upscale your images using Ai</p>
        <div className = "e_upload_div">
        {image ? <>
        <img className = "e_image_uploaded" src = {image} alt = "should have been here"></img>
        <a href = "/upload" className = "enhance_compare_link"><button className = "enhance_back">Back</button></a>
        <a href = "/compare" className = "enhance_compare_link"><button className = "enhance_compare">Compare</button></a>
        <button className = "download_button" onClick = {handleDownload}>Download</button></> : 
        <><div className = "spinner"></div><p className = "loading">Loading</p></>}
        </div>
        <div className = "e_img_container">
          <img src = {image1} alt = "Robot" className = "e_img_style"/>
        </div>
        <button className = "menu_button" onClick={handleButtonClick}><img className = "e_img_clicked" src = {triple_clicked} alt = "Menu"></img></button>
        {isOpen && (<div className = "e_menu">
          <button className = "menu_button_clicked" onClick={handleButtonClick}><img className = "e_img_clicked" src = {triple_clicked} alt = "Menu"></img></button>
          <div className = "login_info">
          <p className = "upload_username">{username}</p>
          <button className = "upload_home"><a className = "upload_home" href = "/upload">Upload</a></button>
          <button className = "upload_instr" onClick={logout}><a className = "upload_home" href = "/">Logout</a></button>
          </div>
          </div>)}
      </div>
    </body>
  );
}
export default Enhance;
