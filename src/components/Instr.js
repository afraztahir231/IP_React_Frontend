import React from 'react'
import image from "../human.png"

const Instr = () => {
    const instr = {
        position : "relative",
        top : "20vh",
        left : "15vw",
        height : "10vh",
        width : "70vw",
        fontSize : "50px",
    };

    const text_style = {
        position : "relative",
        top : "20vh",
        left : "15vw",
        width : "40vw",
    };

    const main_div = {
        position : "relative",
        height : "10vh",
        width : "80vw",
    };

    const side_div = {
        position : "relative",
        backgroundImage : "linear-gradient(to right, #000000 5%, #3533cd)",
        top : "-24vh",
        left : "55vw",
        height : "55vh",
        width : "35vw",
    };

    const image_style = {
        position : "relative",
        top: "10vh",
        left : "8vw",
    };

  return (
    <div style = {main_div}>
      <h1 style = {instr}>Instructions</h1>
      <ol>
        <li style = {text_style}>
            <p>To upload images, click on Upload Images and then select your image.<br></br> 
               (Image must be of .jpeg or .png file format).<br></br> 
               To upload videos, click on Upload Videos and then select your video.<br></br> 
               (Video must be in .mp4 file format).<br></br></p>
        </li>
        <li style = {text_style}>
            <p>After uploading the video pause on the part where you want enhancement done.<br></br> 
               The frame of that specific instant will be extracted and displayed.<br></br>
            </p>
        </li>
        <li style = {text_style}>
            <p>Move the sliding window to the desired part of the image displayed.</p>
        </li>
        <li style = {text_style}>
            <p>Click on enhance image to get results.</p>
        </li>
      </ol>
      <div style = {side_div}>
            <img style = {image_style} src = {image} alt = "man"></img>
      </div>
    </div>
  )
}

export default Instr
