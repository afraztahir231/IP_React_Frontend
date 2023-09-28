import React from 'react'
import image1 from "../image.png";
import triple_clicked from "../triple_clicked.png"
import { useState, useRef, useEffect } from 'react';
import '../styles/Upload.css'
import { authFetch } from '../auth';
import { useNavigate } from "react-router-dom";


const Upload = () => {
  const navigate = useNavigate();

  if (localStorage.getItem('access_token') === "none") {
    console.log("YAAS")
    navigate({pathname: "/login"})
  }
  const [image, setImage] = useState(null);
  const [filename, setfilename] = useState("");
  const [actualimage, setActual] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [clicked, setClicked] = useState(false);
  const token = localStorage.getItem('access_token');
  const [videourl, setVideoURL] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  const videoRef = useRef();
  const [pausedFrame, setPausedFrame] = useState();
  const [prevFrame, setPrevFrame] = useState();
  const [nextFrame, setNextFrame] = useState();
  const [pausedFrameurl, setPausedFrameurl] = useState();
  const [prevFrameurl, setPrevFrameurl] = useState();
  const [nextFrameurl, setNextFrameurl] = useState();

  const handleChoose = () => {
    inputRef.current.click();
  };

  const handleVideoPause = () => {
    const video = videoRef.current;
    const currentTime = video.currentTime;
  
    // Only capture frames if the video is paused and not seeking
    if (video.paused && !video.seeking) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
  
      // Capture the frame at the paused second
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const pausedFrameURI = canvas.toDataURL();
      setPausedFrameurl(pausedFrameURI);
      fetch(pausedFrameURI)
      .then(response => response.blob())
      .then(blobData => {
        // Now you have the Blob data
        const file = new File([blobData], "paused_frame", { type: blobData.type })
        setPausedFrame(file);
      })
      .catch(error => {
        console.error('Error fetching Blob data:', error);
      });
  
      // Calculate the time for frames before and after the paused second
      const prevTime = Math.max(currentTime - 1, 0);
      const nextTime = Math.min(currentTime + 1, video.duration);
  
      // Seek to the time for the previous frame and capture it
      video.currentTime = prevTime;
      video.onseeked = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const prevFrameURI = canvas.toDataURL();
        setPrevFrameurl(prevFrameURI);
        fetch(prevFrameURI)
        .then(response => response.blob())
        .then(blobData => {
          // Now you have the Blob data
          const file = new File([blobData], "prev_frame", { type: blobData.type })
          setPrevFrame(file);
          // You can use the blobData as needed (e.g., send it to the server)
        })
        .catch(error => {
          console.error('Error fetching Blob data:', error);
        });

        // Seek to the time for the next frame and capture it
        video.currentTime = nextTime;
        video.onseeked = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const nextFrameURI = canvas.toDataURL();
          setNextFrameurl(nextFrameURI);
          fetch(nextFrameURI)
          .then(response => response.blob())
          .then(blobData => {
            // Now you have the Blob data
            const file = new File([blobData], "next_frame", { type: blobData.type })
            setNextFrame(file);
            // You can use the blobData as needed (e.g., send it to the server)
          })
          .catch(error => {
            console.error('Error fetching Blob data:', error);
          });

          // Restore the original video time
          video.currentTime = currentTime;
          video.onseeked = null; // Reset the onseeked handler
        };
      };
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleUpload = async () => {
    setClicked(!clicked);
    if (actualimage) {
      try {
        const formData = new FormData();
        formData.append('image', actualimage);
        formData.append('uploaded', 'none');
        formData.append('enhanced', 'none');

        const response = await authFetch('http://10.1.143.113:5000/upload/submit', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json()

          localStorage.setItem('actual', actualimage)
          localStorage.setItem('uploaded_filename', data['uploaded'])
          localStorage.setItem('enhanced_filename', data['enhanced'])

          getUploaded();
        } else {
          console.error('Error uploading image:', response.statusText);
        }
      } catch (error) {
        console.error('Error communicating with the server', error);
      }
    }
  };
  
  //let fetch_upload = 'http://10.1.141.170:8000/api/upload/'
  let getUploaded = async () => {
    let response = await authFetch('http://10.1.143.113:5000/upload/predict', {
      method : 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    });
    let data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setUploaded(imageUrl);
  }

  const handleimage = (url, image) =>{
    setImage(url);
    setActual(image);
  }

  const handleBack = () => {
    setImage(null);
    setPausedFrameurl(null);
    setNextFrameurl(null);
    setPrevFrameurl(null);
    setPausedFrame(null);
  }

  const logout = () => {
    localStorage.setItem('access_token', "none")
  }

  const username = localStorage.getItem("username");

  localStorage.setItem('filename', filename)

  const path = "/enhance"
  return ( 
    <body>
      <div className = "u_div1_style">
        <h1 className = "u_h1_style">Enhance Ai</h1>
        <p className = "u_p_style">Upscale your images using Ai</p>
        {videourl && <p className = "u_video_instr">Pause the video at the desired frame.</p>}
        <div className = "u_upload_div">
          {image || videourl ? 
          <>{image ? <>
          <img className = "u_image_uploaded" src = {image} alt = "HI"/>
          {uploaded ? <><button className = "back" onClick = {handleBack}>Back</button><a href = {path}><button className = "upload_enhance">Enhance</button></a></> : 
           <><button className = "back" onClick = {handleBack}>Back</button><button className = "submit" onClick = {handleUpload}>Submit</button>{clicked ? <><div className = "spinner_upload"></div><p className = "loading">Loading</p></> : console.log("NO")}</>}
           </>:<>
               <video
                ref={videoRef}
                className="u_video_player"
                controls
                src={videourl}
                onPause={handleVideoPause}
              />
               {console.log(localStorage.getItem('videoname'))}
          </>}</>
          :
          <>
          <form className = "form_style" onClick={() => document.querySelector(".input-field").click()}>
            <p className = "u_form_p">Upload Image</p>
            <input type="file" accept = ".jpg, .jpeg, .png" className = "input-field" id = "input_image" hidden 
            onChange = {({target : {files}}) => {
              files[0] && setfilename(files[0].name)
              if(files)
              {
                setImage(URL.createObjectURL(files[0]));
                setActual(files[0]);
                if (filename !== ''){localStorage.setItem('filename', filename)}else{console.log("OOPS did not get filename.")}
              }
            }}/>
          </form>
            <p className = "u_small_p">Add a .jpeg or .png file</p>
            <form className = "form_video_style" onClick={() => {document.querySelector(".input_video").click(); handleChoose()}}>
            <p className = "u_form_p">Upload Video</p>
            <input ref = {inputRef} type="file" accept=".mov,.mp4" className = "input_video" id = "input_video" hidden 
            onChange = {({target : {files}}) => {
              files[0] && setVideoURL(URL.createObjectURL(files[0]))
              if(files)
              {
                setVideoURL(URL.createObjectURL(files[0]));
              }
            }}/>
          </form>
            <p className = "u_small_p_video">Add a .mp4 file</p>
          </>
          }
        </div>
        <div className="u_framesRow">
              {pausedFrame && (
                <div>
                  <h2 className = "video_instr">Select a frame to be enhanced</h2>
                  <div className="u_framesRow">
                  <img className="frameImage" src={prevFrameurl} alt="Frame Before" onClick = {() => {handleimage(prevFrameurl, prevFrame)}}/>
                  <img className="frameImage" src={pausedFrameurl} alt="Paused Frame" onClick = {() => {handleimage(pausedFrameurl, pausedFrame)}}/>
                  <img className="frameImage" src={nextFrameurl} alt="Frame After" onClick = {() => {handleimage(nextFrameurl, nextFrame)}}/>
                  </div>
                </div>
              )}
        </div>
        <div className = "u_img_container">
          <img src = {image1} className = "u_img_style" alt = "robot_image"/>
        </div>
      </div>
      <button className = "u_menu_button" onClick={handleButtonClick}><img className = "u_img_clicked" src = {triple_clicked} alt = "menu-button"></img></button>
        {isOpen && (<div className = "u_menu">
          <button className = "u_menu_button_clicked" onClick={handleButtonClick}><img className = "u_img_clicked" src = {triple_clicked} alt = "menu-button"></img></button>
          <div className = "login_info">
          <p className = "upload_username">{username}</p>
          <button className = "upload_home"><a className = "upload_home" href = "/upload">Upload</a></button>
          <button className = "upload_instr" ><a className = "upload_home" href = "/" onClick = {logout}>Logout</a></button>
          </div>
        </div>)}
    </body>
  );
}

export default Upload
