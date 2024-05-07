import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickLocation, setPickLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [dropLocation, setDropLocation] = useState("");

 
  const validate = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is Required";
    }
    if (!pickLocation.trim()) {
      errors.pickLocation = "Pickup Location is required!";
    }
    if (!dropLocation.trim()) {
      errors.dropLocation = "Drop Location is required!";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required!";
    }

    return errors;
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDropLocation = (e) => {
    setDropLocation(e.target.value);
  };

  const handlePickLocation = (e) => {
    setPickLocation(e.target.value);
    console.log(pickLocation);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try{
        const response = await Axios.post(
          "http://localhost:3032/api/driverdetails",
          {name, phone, pickLocation, dropLocation}
        );
        console.log("Registration Successfully!", response.data);
        setName("");
        setPhone("");
        setPickLocation("");
        setDropLocation("");
        navigate("/");
      }  
      catch(error){
        console.error("Registration Failed", error);
        if(error.response && error.response.data){
          setErrors({serverError :  error.response.data});
          setName("");
          setPhone("");
          setPickLocation("");
          setDropLocation("");          
        }else{
          setErrors({serverError : "Unknown Error Occured"});
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const username = localStorage.getItem('username');

  return (
    <div
      className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-900 via-gray-700 to-gray-300"
      style={{ backgroundImage: "url(bg-image-1.jpg)", backgroundRepeat: `no-repeat`, backgroundSize: "cover", backgroundPosition: "center", paddingTop: "73px" }}
    >
      <div className="bg-white px-8 shadow-lg rounded-md ">
        <h1 className="text-center m-4 font-serif font-bold text-2xl">
          Welcome {username} !
        </h1>
        <div className={`rounded-md bg-white border border-solid ${errors.name ? "my-2" : "my-6"} mx-6`}>
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
        </div>
        {errors.name && <p className="text-red-600 mx-6 my-2">{errors.name}</p>}
        <div className={`rounded-md bg-white border border-solid ${errors.phone ? "my-2" : "my-6"} mx-6`}>
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="Phone number"
            value={phone}
            onChange={handlePhone}
          />
        </div>
        {errors.phone && <p className="text-red-600 mx-6 my-2">{errors.phone}</p>}
        <div className={`rounded-md bg-white border border-solid ${errors.pickLocation ? "my-2" : "my-6"} mx-6`}>
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="Pick up location"
            type="text"
            value={pickLocation}
            onChange={handlePickLocation}
          />
        </div>
        {errors.pickLocation && <p className="text-red-600 mx-6 my-2">{errors.pickLocation}</p>}
        <div className={`rounded-md bg-white border border-solid ${errors.dropLocation ? "my-2" : "my-6"} mx-6`}>
          <input
            className="w-full bg-inherit outline-none p-2 rounded-md"
            placeholder="Drop location"
            value={dropLocation}
            onChange={handleDropLocation}
          />
        </div>
        {errors.dropLocation && <p className="text-red-600 mx-6 my-2">{errors.dropLocation}</p>}
        <div className="flex justify-center flex-col mx-6 pb-4 font-bold font-serif">
          <button
            onClick={handleSubmit}
            className="border-black rounded-md p-2 border mx-6 my-2 font-bold font-serif hover:shadow-lg bg-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
