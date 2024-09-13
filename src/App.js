import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Loginpage/Login';
import Signup from './Components/Singuppage/Signup';
import Home from './Components/Homepage/Home';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  // const [userId, setuserId] = useState(localStorage.getItem("userId") || null)
  // const [isloggedin, setloggedin] = useState(!!userId)

  // useEffect(()=>{
  //   if(userId){
  //     console.log(userId)
  //   }
  // },[userId])

  const [isloggedin, setloggedin] = useState(() => {

    //On refresh we do not want to change the routes
  const storedStatus = localStorage.getItem('isloggedin'); // Initialize state from localStorage
    return storedStatus === 'true';  // Convert string to boolean
  });

  useEffect(() => {
    localStorage.setItem('isloggedin', isloggedin); // Store login state in localStorage whenever it changes
  }, [isloggedin]);

 
  // const getInitialLoginState = () => {
  //   const storedStatus = localStorage.getItem('isloggedin');
  //   return storedStatus === 'true';
  // };

  // const [isloggedin, setloggedin] = useState(getInitialLoginState);

  // useEffect(() => {
       //syntax: localStorage.setItem(key, value);
  //   localStorage.setItem('isloggedin', isloggedin);
  // }, [isloggedin]);
  
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar isloggedin={isloggedin} setloggedin={setloggedin} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" 
                 element={!isloggedin ? <Login isloggedin={isloggedin} setloggedin={setloggedin} /> /* passing props */: <Navigate to="/home" />} />
          <Route path="/signup" 
                 element={!isloggedin ? <Signup /> : <Navigate to="/home" />} />

          {/* Private Route for home page */}
          <Route
            path="/home"
            element={
              isloggedin ?  <Home/> : <Navigate to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;


