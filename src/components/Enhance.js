import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { saveAs } from "file-saver"
import image1 from "../image.png";
import triple_clicked from "../triple_clicked.png";
import "./Enhance.css";

const Enhance = (props) => {
  const params = useParams();
  const filename = params.filename;
  console.log(filename);
  let [image, setImage] = useState('');
  let [uploaded, setUploaded] = useState('');

  useEffect(() => {
    getUploaded();
    getInfo();
  }, [])

  let fetch_path = 'http://10.1.141.170:8000/api/enhanced/' + filename
  let getInfo = async () => {
    let response = await fetch(fetch_path);
    let data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setImage(imageUrl);
  }
  
  let fetch_upload = 'http://10.1.141.170:8000/api/uploaded/' + filename
  let getUploaded = async () => {
    let response = await fetch(fetch_upload);
    let data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setUploaded(imageUrl);
  } 

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDownload = () => {
    saveAs(image, filename.slice(0, -4) + "_out.jpg");
  };

  const div1_style = {
    position: "relative",
    backgroundImage: "linear-gradient(to right, #000000 5%, #3533cd)",
    height: "100vh",
    width: "100vw",
    top: "-2.5vh",
  };

  const h1_style = {
      position : "relative",
      color : "white",
      top : "5vh",
      textAlign : "center",
  };

  const p_style = {
    position : "relative",
    color : "white",
    top : "4vh",
    textAlign : "center",
  };

  const upload_div = {
    position : "relative",
    border: "3px dotted white",
    borderRadius : "40px",
    height : "74.38vh",
    width : "69.19vw",
    top : "7vh",
    left : "15vw",
  };

  /*const button1_style = {
    position : "relative",
    borderRadius : "25px",
    border : "0px",
    top : "25vh",
    left : "30.7vw",
    height : "5vh",
    width : "15vh",
  };

  const small_p = {
    position : "relative",
    color : "white",
    top : "25vh",
    fontSize : "10px",
    textAlign : "center",
  };*/

  const img_container = {
      position : "relative",
      height : "20vh",
      width : "10vw",
      top : "-7vh",
      left : "88vw",
  };

  const img_style = {
      maxWidth : "20vh",
      maxHeight : "20vh",
      display : "block",
  };

  /*const triple_img = {
      maxHeight : "100%",
      maxWidth : "100%",
  };*/

  const menu = {
    position : "relative",
    top : "-109.5vh",
    width: "15vw",
    left: "85vw",
    height: "100vh",
    padding: "0px",
    backgroundImage: "linear-gradient(to left, #000000 1%, #737373)",
    overflow: "hidden",
    transition: "width 0.00001s ease-in",
  };

  const img_clicked = {
    maxHeight: "100%",
    maxWidth : "100%",
  };

  const name = {
    position : "relative",
    color : "white",
    top : "12.5vh",
    fontSize : "24px"
  };

  /*const form_p = {
    position : "relative",
    top : "1.5vh",
  };*/

  const image_uploaded = {
    maxHeight : "100%",
    maxWidth : "100%",
    minHeight : "100%",
    minWidth : "100%",
    borderRadius : "40px",
  };
  
  const download_button = {
  	position : "relative",
  	height : "4vh",
  	width : "8vw",
  	top : "2vh",
  	left : "32vw",
  	borderRadius: "20px",
  	backgroundColor: "white",
  	border : "none",
  };

  return (
    <body>
      <div style = {div1_style}>
        <h1 style = {h1_style}>Enhance Ai</h1>
        <p style = {p_style}>Upscale your images using Ai</p>
        <div style = {upload_div}>
        {image && uploaded ? <>
        <img style = {image_uploaded} src = {image} alt = "should have been here"></img>
        <button style = {download_button} onClick = {handleDownload}>Download</button></> : 
        <><div className = "spinner"></div><p className = "loading">Loading</p></>}
        </div>
        <div style = {img_container}>
          <img src = {image1} alt = "Robot" style = {img_style}/>
        </div>
        <button className = "menu_button" onClick={handleButtonClick}><img style = {img_clicked} src = {triple_clicked} alt = "Menu"></img></button>
        {isOpen && (<div style = {menu}>
          <button className = "menu_button_clicked" onClick={handleButtonClick}><img style = {img_clicked} src = {triple_clicked} alt = "Menu"></img></button>
          <p style = {name}>Name</p>
          <p style = {name}>Home</p>
          <p style = {name}>Instructions</p>
          </div>)}
      </div>
    </body>
  );
}
export default Enhance;
