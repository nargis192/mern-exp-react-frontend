import React, { useState } from 'react';
import '../Singuppage/Signup.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
 
  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();  // Prevent form default submission

    // Check if passwords match
    

    try {
      const res = await axios.post("http://localhost:5555/api/users/signup", {
        Name,
        Email,
        Password,
        Confirmpassword
      });
      console.log(res.data);
      setName("")
      setEmail("")
      setPassword("")
      setConfirmpassword("")
      
      Navigate("/")
  

    } catch (err) {
      console.error("Error during signup:", err);
     
    }
  };

  return (
    <div className="Signcontainer">
      <form onSubmit={handleSignup}>
        <h2>SIGN UP PAGE</h2>
        
        

        <div className="form-group2">
          <input
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group2">
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group2">
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group2">
          <input
            type="password"
            placeholder="Confirm Password"
            value={Confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </div>
        <div className="form-group2">
         <NavLink to="/">Already have Account?</NavLink>
        </div>
        <div className="form-group2">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

