import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import AppleSignin from 'react-apple-signin-auth';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import "./index.css";

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


    
    
  const onSuccessGoogleLogin = async (res)=>{
      
      try{
        const response = await axios.post('http://localhost:5000/google/login',res)
        
        if(response.status === 200){
          localStorage.setItem("token", response.data.token);
          navigate('/home')
        }
      }catch(err){
        console.log(err)
      }
      
    
  }

  const onErrorGoogleLogin = (err)=>{
      console.log(err)
  }
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          mobile_number:number,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log(response)
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data || "Unknown error"));
    }
  
  };
  const onClickSignUp = ()=>{
    navigate("/signup")
  }

  return (
    <>
      <div className="main-container">
        <form onSubmit={handleLogin} className="form-container">
        <h1 className="heading">Login</h1>
        <div className="input-container">
            <label className="input-label" htmlFor="number">Mobile Number</label>
            <input
              className="login-input"
              type="text"
              placeholder="Mobile Number"
              id="number"
              value={number}
              onChange={(e) =>{ e.target.value >= 10 && setNumber(e.target.value)}}
              required
            />
        </div>
        <div  className="input-container">
        <label className="input-label" htmlFor="password">Password</label>
        <input
        className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          id ="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        
        
        <button className="login-button" type="submit">Login</button>
        <p className="create-account-para">
          Create an account
        </p>
      <button className="create-account-btn" type="button" onClick={onClickSignUp}>Sign Up?</button>
      <br/>
      <p className="create-account-para">Login with...</p>
      
      <GoogleLogin onSuccess={onSuccessGoogleLogin} onError={onErrorGoogleLogin} />
      <FacebookLogin
        appId="1088597931155576"
        onSuccess={(response) => {
          console.log('Login Success!', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
        }}
        style={{
          backgroundColor: '#4267b2',
          color: '#fff',
          fontSize: '16px',
          padding: '10px 12px',
          border: 'none',
          width:'55%',
          borderRadius: '4px',
          marginTop:'10px',
        }}
      />
      
      <AppleSignin style={{marginTop:'10px'}}/>
 
      </form>
      
      
      </div>
      
    </>
    
  );
};

export default Login;
