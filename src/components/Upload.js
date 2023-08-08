import React from 'react'
import image1 from "../image.png";
import triple_clicked from "../triple_clicked.png"
import { useState } from 'react';
import './Upload.css'


const Upload = () => {
  const [image, setImage] = useState(null);
  const [filename, setfilename] = useState("No selected file.");
  const [actualimage, setActual] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
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

  const button1_style = {
    position : "relative",
    borderRadius : "25px",
    border : "0px",
    top : "25vh",
    left : "30.7vw",
    height : "5vh",
    width : "15vh",
    backgroundColor : "white",
  };

  const small_p = {
    position : "relative",
    color : "white",
    top : "25vh",
    fontSize : "10px",
    textAlign : "center",
  };

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

  const form_p = {
    position : "relative",
    top : "1.5vh",
  };

  const image_uploaded = {
    maxHeight : "100%",
    maxWidth : "100%",
    minHeight : "100%",
    minWidth : "100%",
    borderRadius : "40px",
  };

  const handleUpload = async () => {
    setClicked(!clicked);
    console.log("handleUpload called");
    if (actualimage) {
      const formData = new FormData();
      formData.append('image', actualimage);
      formData.append('filename', filename);

      try {
        const response = await fetch('http://10.1.141.170:8000/api/upload/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      
      getUploaded();
    }
  };
  
  let fetch_upload = 'http://10.1.141.170:8000/api/uploaded/' + filename
  let getUploaded = async () => {
    let response = await fetch(fetch_upload);
    let data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setUploaded(imageUrl);
  }

  const path = "/enhance/" + filename
  

  return (
    <body>
      <div style = {div1_style}>
        <h1 style = {h1_style}>Enhance Ai</h1>
        <p style = {p_style}>Upscale your images using Ai</p>
        <div style = {upload_div}>
          {image ? <>
          <img style = {image_uploaded} src = {image} alt = "HI"/>
          {uploaded ? <a href = {path}><button className = "enhance">Enhance</button></a> : 
           <><button className = "submit" onClick = {handleUpload}>Submit</button>{clicked ? <><div className = "spinner_upload"></div><p className = "loading">Loading</p></> : console.log("NO")}</>}
           </>:
          <>
          <form className = "form_style" onClick={() => document.querySelector(".input-field").click()}>
            <p style = {form_p}>Upload Image</p>
            <input type="file" accept = "image/*" className = "input-field" id = "input_image" hidden 
            onSubmit = {handleUpload} onChange = {({target : {files}}) => {
              files[0] && setfilename(files[0].name)
              if(files)
              {
                setImage(URL.createObjectURL(files[0]));
                setActual(files[0]);
              }
            }}/>
          </form>
            <p style = {small_p}>Add a .jpeg or .png file</p>
            <button type="button" style = {button1_style}>Upload Video</button>
            <p style = {small_p}>Add a .mp4 file</p>
            </>
          }
        </div>
        <div style = {img_container}>
          <img src = {image1} style = {img_style} alt = "robot_image"/>
        </div>
        <button className = "menu_button" onClick={handleButtonClick}><img style = {img_clicked} src = {triple_clicked} alt = "menu-button"></img></button>
        {isOpen && (<div style = {menu}>
          <button className = "menu_button_clicked" onClick={handleButtonClick}><img style = {img_clicked} src = {triple_clicked} alt = "menu-button"></img></button>
          <p style = {name}>Name</p>
          <p style = {name}>Home</p>
          <p style = {name}>Instructions</p>
          </div>)}
      </div>
    </body>
  );
}

export default Upload
