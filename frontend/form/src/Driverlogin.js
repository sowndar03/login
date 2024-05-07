import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () =>{
    const validationCheck = validate();
    if(Object.keys(validationCheck).length === 0){
        try{
          console.log(email);
          console.log(password);
          const response = await Axios.post(
            "http://localhost:3032/api/driverlogin",
            { email, password }
          );
          const {message, username} = response.data;
          localStorage.setItem('username', username);
          setEmail("");
          setPassword("");
          navigate('/driverprofile')
        }catch(error) {
          console.error("Login failed" , error);
          if(error.response && error.response.data){
            setErrors({serverError: error.response.data})
          }
        }
    }else{
      setErrors(validationCheck);
    }
    
  }

  const validate = () =>{
    const errors = {}

    if(!email.trim()){
      errors.email = "Email is Required!";
    }else if(!isValidateEmail(email)){
      errors.email = "Invalid email address"
    }

    if(!password.trim()){
      errors.password = "Password is Required!";
    } else if(password.length < 8){
      errors.password = "Password is too short";
    }
    return errors;
  }
  
  const isValidateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-900 to-gray-400">
      <div className="bg-white shadow-lg rounded-md p-6">
        <h1 className="font-bold font-serif text-xl  p-2 text-center">Driver Login</h1>
        <div className="p-4 ">
          <div className={`w-full h-11 ${errors.email ? "mb-1" : "mb-6"}`}>
            <input
              className="w-full h-full p-4 rounded-md outline-none border-2 border-solid border-opacity-20"
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {errors.email && (<p className="text-red-500 mb-2">{errors.email}</p>)}
          <div className="w-full h-10 mb-1">
            <input
              className="w-full h-full p-4 rounded-md outline-none border-2 border-solid border-opacity-20"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {errors.password && (<p className="text-red-500 mb-2">{errors.password}</p>)}
          <p
            className={`flex justify-end font-semibold font-serif cursor-pointer`}
            onClick={handleSignUp}
          >
            New User? sign Up
          </p>
        </div>
        {errors.serverError && (<p className="text-red-500 mx-8 my-2">{errors.serverError.error}</p>)}
        <div className="flex justify-center items-center border mx-10 rounded-md bg-white cursor-pointer font-bold font-serif p-2 hover:shadow-lg">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
