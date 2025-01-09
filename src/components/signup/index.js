import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import "./index.css"

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber,setPhoneNumber] = useState()
  const [password, setPassword] = useState("");
  const [ReEnterPassword,setReEnterPassword] = useState("")
  // const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const successAlert = ()=>{
    Swal.fire({
        title: "Created",
        text: "User Created Successfully",
        icon: "success",
        confirmButtonText: "Login",
      });
  }
  
    
  // const onClickShow = (e)=>{
  //   e.preventDefault()
  //   setShowPassword(prevState=>!prevState)
  // }


  const handleSignup = async (e) => {
    e.preventDefault();
    if(password !== ReEnterPassword){
      alert('Password Mismatch')
    }else{
      try {
        const response = await axios.post("http://localhost:5000/register", {
          first_name:firstname,
          last_name:lastname,
          mobile_number:phoneNumber,
          password,
        });
        console.log(response)
        successAlert();
        navigate("/login");
      } catch (error) {
        console.error("Signup failed", error.response?.data || error.message);
        alert("Signup failed: " + (error.response?.data || "Unknown error"));
      }
    }
    
  };
  const onClickLogin = ()=>{
    navigate("/login")
  }

  return (
    <div className="main-container">
    <form onSubmit={handleSignup} className="form-container">
      <h1 className="heading">Signup</h1>
      <div className="input-container">
            <label className="input-label" htmlFor="firstname">First Name</label>
            <input
              className="login-input"
              type="text"
              placeholder="first name"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            
        </div>
        <div className="input-container">
            <label className="input-label" htmlFor="lastname">Last Name</label>
            <input
              className="login-input"
              type="text"
              placeholder="last name"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
        </div>
      <div className="input-container">
            <label className="input-label" htmlFor="phoneNumber">Phone Number</label>
            <input
              className="login-input"
              type="number"
              placeholder="Phone Number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) =>{ e.target.value.length <= 10 && setPhoneNumber(e.target.value)}}
              required
            />
        </div>
        <div  className="input-container">
        <label className="input-label" htmlFor="password">Password</label>
        <div className='password-input-container'>
          <input
            className="login-password"
            type="password"
            placeholder="Password"
            value={password}
            id ="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <button type="button" onClick={onClickShow} className='show-icon-btn'>
          {showPassword ?<IoIosEyeOff size={24}/>:<IoIosEye size={24}/>}
          </button> */}
          
          
        </div>
        
        
        </div>
        <div  className="input-container">
        <label className="input-label" htmlFor="reEnterPassword">Re-Enter Password</label>
        <div className='password-input-container'>
          <input
            className="login-password"
            type="password"
            placeholder="Password"
            value={ReEnterPassword}
            id ="reEnterPassword"
            onChange={(e) => setReEnterPassword(e.target.value)}
            required
          />
          {/* <button type="button" onClick={onClickShow} className='show-icon-btn'>
          {showPassword ?<IoIosEyeOff size={24}/>:<IoIosEye size={24}/>}
          </button> */}
        </div>
        
        </div>
      <button className="login-button" type="submit">Signup</button>
      <p className="create-account-para">
          Already have an account
        </p>
      <button className="create-account-btn" type="button" onClick={onClickLogin}>Login</button>
    </form>
    </div>
  );
};

export default Signup;
