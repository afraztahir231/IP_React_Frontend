import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import image1 from "../image.png";
import triple_clicked from "../triple_clicked.png"



const LoginPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
      setIsOpen(!isOpen);
    };

  const loginUser = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(data)
    };

    fetch('/auth/login', requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data.data.access_token)
          localStorage.setItem('access_token', data.data.access_token)
          localStorage.setItem('refresh_token', data.data.refresh_token)
          localStorage.setItem('username', data.username)
          login(data.data.access_token);
          navigate('/upload',  { state: { username: data.username } });
        } else {
          setError('Invalid username or password');
        }
      });

    reset();
  }

  return (
    <div className="login_main_div">
      <h1 className = "login_header">Enhance AI</h1>
      <p className = "login_small_header">Enhance images using AI</p>
      <div className="login_form_div">
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>
        )}

        <h1 className="login_login">Login</h1>
        
        <form>
          <div className = "form_contain">
          <Form.Group>
            <Form.Control
              type="text" placeholder='  Username' className = "login_username"
              {...register("username", { required: true, maxLength: 25 })}
            />
          </Form.Group>
          {errors.username?.type === "required" ? <p style={{ position : "relative", color: "red", top : "0vh", left : "0vw"}}>Username is required</p>:
          errors.username?.type === "maxLength" ? <p style={{ position : "relative", color: "red", top : "0vh", left : "0vw" }}>Max characters should be 25</p> : <div className = "login_fill"></div>}
          

          <Form.Group>
            <Form.Control
              type="password" placeholder='  Password' className = "login_password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </Form.Group>
          {errors.password?.type === "required" && <p style={{ position : "relative", color: "red", top : "0vh", left : "0vw" }}> Password is required</p>}
          {errors.password?.type === "minLength" && <p style={{ position : "relative", color: "red", top : "0vh", left : "0vw"  }}>Minimum characters should be 8</p>}
          </div>
          <Form.Group>
            <button as="sub" variant="primary" onClick={handleSubmit(loginUser)} className = "login_butt">
              Login
            </button>
          </Form.Group>
          <Form.Group>
            <small style = {{position : "relative", top : "2vh", left : "0vw"}}>
              Do you already have an account?
              <Link className = "create" to="/signup">Create Account</Link>
            </small>
          </Form.Group>
        </form>
        </div>
      <div className = "login_img_container">
        <img src = {image1} className = "login_img_style" alt = "robot_image"/>
      </div>
        <button className = "login_menu_button" onClick={handleButtonClick}><img className = "login_img_clicked" src = {triple_clicked} alt = "menu-buttonss"></img></button>
      {isOpen && (<div className = "login_menu">
        <button className = "login_menu_button_clicked" onClick={handleButtonClick}><img className = "login_img_clicked" src = {triple_clicked} alt = "menu-buttonss"></img></button>
          <div className = "login_info">
          <button className = "login_home"><a className = "login_home" href = "/">Home</a></button>
          <button className = "login_instr"><a className = "login_home" href = "/signup">Sign Up</a></button>
          </div>
      </div>)}
    </div>
  );
};

export default LoginPage;
