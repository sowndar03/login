// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Driverlogin from './Driverlogin'
import DriverRegister from "./DriverRegister"
import Driverprofile from "./Driverprofile"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/driverlogin" element = {<Driverlogin />} />
        <Route path='/driverRegister' element = {<DriverRegister />} />
        <Route path='/driverprofile' element = {<Driverprofile />} />
      </Routes>
    </Router>
  );
}

export default App;
