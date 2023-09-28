import React from "react";
import { useState, useRef } from "react";

export default function VideoInput(props) {
  const { height } = props;

  const inputRef = useRef();
  const videoRef = useRef();

  const [source, setSource] = useState();
  const [pausedFrame, setPausedFrame] = useState();
  const [prevFrame, setPrevFrame] = useState();
  const [nextFrame, setNextFrame] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

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
      setPausedFrame(pausedFrameURI);
  
      // Calculate the time for frames before and after the paused second
      const prevTime = Math.max(currentTime - 1, 0);
      const nextTime = Math.min(currentTime + 1, video.duration);
  
      // Seek to the time for the previous frame and capture it
      video.currentTime = prevTime;
      video.onseeked = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const prevFrameURI = canvas.toDataURL();
        setPrevFrame(prevFrameURI);
  
        // Seek to the time for the next frame and capture it
        video.currentTime = nextTime;
        video.onseeked = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const nextFrameURI = canvas.toDataURL();
          setNextFrame(nextFrameURI);
  
          // Restore the original video time
          video.currentTime = currentTime;
          video.onseeked = null; // Reset the onseeked handler
        };
      };
    }
  };
  
  

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    },
    uploadBox: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "10px",
      borderRadius: "5px",
      textAlign: "center",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      width: "50%", // Adjust the width based on your preference
      maxWidth: "40%", // Maximum width for larger screens
      height: "50%",
    },
    uploadButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
      marginTop: "20px",
    },
    video: {
      marginTop: "5px",
      width: "100%",
      height: height,
    },
    framesRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10px",
    },
    frameImage: {
      maxWidth: "30%",
      border: "1px solid #ccc",
      margin: "0 5px",
    },
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            background: linear-gradient(to right, #000000 5%, #3533cd);
            background-size: cover;
            background-position: center;
          }

          @media (max-width: 768px) {
            /* Apply styles for smaller screens */
            ${styles.framesRow} {
              flex-direction: column;
            }
            ${styles.frameImage} {
              max-width: 100%;
              margin: 5px 0;
            }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.uploadBox}>
          <input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            accept=".mov,.mp4"
            style={{ display: "none" }}
          />
          {!source && (
            <div>
              <h2>Upload a Video</h2>
              <button style={styles.uploadButton} onClick={handleChoose}>
                Choose Video
              </button>
            </div>
          )}
          {source && (
            <div>
              <video
                ref={videoRef}
                style={styles.video}
                controls
                src={source}
                onPause={handleVideoPause}
              />
            </div>
          )}
        </div>
        <div style={styles.framesRow}>
          {pausedFrame && (
            <div>
              <h2>Frames:</h2>
              <div style={styles.framesRow}>
                <img
                  style={styles.frameImage}
                  src={prevFrame}
                  alt="Frame Before"
                />
                <img style={styles.frameImage} src={pausedFrame} alt="Paused Frame" />
                <img style={styles.frameImage} src={nextFrame} alt="Frame After" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
