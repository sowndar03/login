import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "./Components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [dob, setDob] = useState("");

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await Axios.post(
          "http://localhost:3032/api/register",
          { email: search, name, password, dob }
        );
        console.log("Registration successful", response.data);
        setSearch("");
        setName("");
        setDob("");
        setPassword("");
        navigate("/login");
      } catch (error) {
        console.error("Registration failed", error);
        if (error.response && error.response.data) {
          setErrors({ serverError: error.response.data });
          setSearch("");
          setName("");
          setPassword("");
        } else {
          setErrors({ serverError: "Unknown Error occured!" });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

//   const responseMessage = async (response) => {
//     console.log(response);
//     try{
//       await Axios.post("/api/google/signup", { credential: response });
//       history.push("/login");
//     }
//     catch(error){
//       console.error("Error signing up with Google:", error);
//     }
// };
// const errorMessage = (error) => {
//     console.log(error);
// };

  const validate = () => {
    const errors = {};

    if (!search.trim()) {
      errors.email = "Emails is required!";
    } else if (!isValidEmail(search)) {
      errors.email = "Invalid Email Address";
    }

    if (!name.trim()) {
      errors.name = "Name is Required";
    }
    if(!dob){
      errors.dob = "Date of birth is required!";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password is too short";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleName = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handledob = (e) =>{
    setDob(e.target.value)
    console.log(dob);
  }

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="h-screen flex justify-center items-center  bg-gradient-to-r from-purple-900 via-gray-700 to-gray-300"
    >
    <Navbar />
      <div className="bg-white  px-8 shadow-lg rounded-md ">
        <h1 className="text-center m-4 font-serif font-bold text-2xl">
          Register
        </h1>
        <div
          className={`rounded-md bg-white border border-solid ${
            errors.email ? "my-1" : "my-2"
          } mx-6`}
        >
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="Email"
            value={search}
            onChange={handleChange}
          />
        </div>
        {errors.email && (
          <p className="mx-6 my-2 text-red-600">{errors.email}</p>
        )}
        <div
          className={`rounded-md bg-white border border-solid ${
            errors.email ? "my-2" : "my-6"
          } mx-6`}
        >
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
        </div>
        {errors.name && <p className="text-red-600 mx-6 my-2">{errors.name}</p>}
        <div
          className={`rounded-md bg-white border border-solid ${
            errors.email ? "my-1" : "my-2"
          } mx-6`}
        >
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="DOB"
            type= "date"
            value={dob}
            onChange={handledob}
          />
        </div>
        {errors.dob && (
          <p className="mx-6 text-red-600 my-2">{errors.dob}</p>
        )}
        <div
          className={`rounded-md bg-white border border-solid ${
            errors.email ? "mx-6" : "m-6"
          } my-2`}
        >
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        {errors.password && (
          <p className="mx-6 text-red-600 my-2">{errors.password}</p>
        )}
        <div className="mx-6 my-2 flex justify-end underline cursor-pointer">
          <p onClick={handleSignInClick} className="font-semibold font-mono">
            Sign In?
          </p>
        </div>
        <div className="flex justify-center flex-col mx-6 font-bold font-serif">
          <button
            onClick={handleRegister}
            className="border-black rounded-md p-2 border mx-6 my-2 font-bold font-serif hover:shadow-lg bg-white"
          >
            Register
          </button>
          {errors.serverError && (
            <p className="mx-6 my-2 text-red-600">{errors.serverError.error}</p>
          )}
          <div className="flex items-center justify-center my-2">
            <hr className="border-gray-600 w-full mr-2" />
            <span className="text-gray-600">or</span>
            <hr className="border-gray-600 w-full ml-2" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
