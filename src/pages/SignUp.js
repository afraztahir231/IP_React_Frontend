import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import "../styles/SignUp.css"
import image1 from "../image.png";
import triple_clicked from "../triple_clicked.png";


const SignUpPage = () => {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [serverResponse, setServerResponse]=useState('');

    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
      setIsOpen(!isOpen);
    };


    const submitForm = (data) => {
        /*to check if the password and confirmPassword are equal*/
        if (data.password === data.confirmPassword) {

            const body = {
                username: data.username,
                email: data.email,
                password: data.password
            }
            /*send the data to server*/
            const requestOptions = {
                method: "POST",
                /*data will be in json format*/
                headers: {
                    'content-type': 'application/json'
                },

                /*body that we are going to send with this data*/
                /*stringify converts the object into json*/
                body: JSON.stringify(body)

            }

            fetch('/auth/signup', requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setServerResponse(data.message)
                    console.log(serverResponse)
                    setShow(true)
                })
                .catch(err => console.log(err))

            reset()
        }

        else {

            alert("Passwords do not match")
        }
    }

    return (

        /*styling*/
        <div className = "signup_main_div">
            <h1 className = "signup_header">Enhance AI</h1>
            <p className = "signup_small_header">Enhance images using AI</p>
            <div className = "signup_form_div">

                {show?       //to show the alersts, if show is true
                    <>
                      <Alert variant="success" onClose={() => {setShow(false)}} dismissible>
                            <p>
                                {serverResponse}
                            </p></Alert>
                        <h1 className = "signup_signup">SignUp</h1>
                    </>
                    :
                    <h1 className = "signup_signup">SignUp</h1>}
                <form>
                    <Form.Group>
                        <Form.Control className = "signup_username_fill" placeholder= '  Username'
                            type="text"
                            {...register("username", { required: true, maxLength: 25 })}
                        />
                    </Form.Group>
                    {errors.username?.type === "required" ? <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw"}}>Username is required</small> : <div className = "signup_div_fill"></div>}
                    {errors.username?.type === "maxLength" ? <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw" }}>Max characters should be 25</small> : <div className = "signup_div_fill"></div>}
                    
                    <Form.Group>
                        <Form.Control className = "signup_email_fill" placeholder='  Email'
                            type="email"
                            {...register("email", { required: true, maxLength: 80 })}
                        />
                    </Form.Group>
                    {errors.email?.type === "required" ? <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw" }}>Email is required</small> : <div className = "signup_div_fill"></div>}
                    {errors.email?.type === "maxLength" ? <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw"}}>Max characters should be 80</small> : <div className = "signup_div_fill"></div>}
                    
                    <Form.Group>
                        <Form.Control className = "signup_password_fill" placeholder='  Password'
                            type="password"
                            {...register("password", { required: true, minLength: 8 })}
                        />
                    </Form.Group>
                    {errors.password?.type === "required" ? <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw" }}> Password is required</small> : <div className = "signup_div_fill"></div>}
                    {errors.password?.type === "minLength" ? <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw"}}>Minimum characters should be 8</small> : <div className = "signup_div_fill"></div>}
                    
                    <Form.Group>
                        <Form.Control className = "signup_confirm_fill" placeholder='  Confirm Password'
                            type="password"
                            {...register("confirmPassword", { required: true, minLength: 8 })}
                        />
                    </Form.Group>
                    {errors.confirmPassword?.type === "required" && <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw", bottom : "0vw", }}>Confirm password is required</small>}
                    {errors.confirmPassword?.type === "minLength" && <small style={{ position : "relative", color: "red", top : "5vh", left : "0vw", bottom : "0vw", }}>Minimum characters should be 8</small>}
                    
                    <Form.Group className = "signup_form_butt">
                        <button className = "signup_butt" as="sub" variant="primary" onClick={handleSubmit(submitForm)}>Sign Up</button>
                    </Form.Group>
                    
                    <Form.Group>
                        <small className = "signup_small">
                            Already have an account?
                            <a className = "linklog" href='/login'>Log In</a>
                        </small>
                    </Form.Group>
                </form>
            </div>
            <div className = "signup_img_container">
              <img src = {image1} className = "signup_img_style" alt = "robot_image"/>
            </div>
            <button className = "menu_button" onClick={handleButtonClick}><img className = "img_clicked" src = {triple_clicked} alt = "menu-buttonss"></img></button>
            {isOpen && (<div className = "signup_menu">
                <button className = "menu_button_clicked" onClick={handleButtonClick}><img className = "img_clicked" src = {triple_clicked} alt = "menu-buttonss"></img></button>
                <div className = "signup_info">
                <button className = "signup_home"><a className = "signup_home" href = "/">Home</a></button>
                <button className = "signup_instr"><a className = "signup_home" href = "/login">Login</a></button>
                </div>
            </div>)}
        </div>
    );
}

export default SignUpPage;
