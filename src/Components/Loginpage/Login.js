import React from 'react';
import '../Loginpage/Login.css';
import { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate} from 'react-router-dom';

const Login = ({isloggedin, setloggedin}) => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const Navigate = useNavigate()

    // const Loginhandle = async (e) => {
    //     e.preventDefault()

    //     try {
    //         let res = await axios.post("http://localhost:5555/api/users/login", { Email, Password })
    //         console.log(res.data)

    //         // setloggedin(true); 
    //         setEmail("")
    //         setPassword("")
        
    //         Navigate("/home")
    //         // setuserId(res.data._id)
        
    //         // localStorage.setItem("userId", res.data._id)
    //         // In Axios, the response object contains several properties such as data, status, statusText, headers, etc. 
    //         // The key part you usually care about is data, which holds the actual response payload returned from the server.

    //         // const res = await axios.post('http://localhost:5555/api/users/login', { email, password });
    //         // console.log(res);        This logs the full Axios response object
    //         // console.log(res.data);   This logs { user: { id: 1, name: "John Doe", email: "john@example.com" } }
    //         // console.log(res.data.user);  This logs the actual user object { id: 1, name: "John Doe", email: "john@example.com"     
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const Loginhandle = async (e) => {
        e.preventDefault();  // Prevent form default submission
    
        // Check if passwords match
        try {
          const res = await axios.post("http://localhost:5555/api/users/login", {
            Email,
            Password,
           });
          console.log(res.data);
          
          setEmail("")
          setPassword("")
          setloggedin(true); 
          
          Navigate("/home")
      
    
        } catch (err) {
          console.error("Error during login:", err);
         
        }
      };

    return (
        <div className='Logcontainer'>
            <form onSubmit={Loginhandle} >
                <h2>LOGIN PAGE</h2>
                <div className="form-group1">
                    <input
                        type="text"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="form-group1">
                    <input
                        type="password"
                        placeholder="Password"
                        value={Password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <div className="form-group1">
                <NavLink to="/signup">Don't have an account? Sign up here</NavLink>
                </div>
                <div className="form-group1">
                    <button type="submit">Login</button>
                </div>
                
            </form>
               

        </div>


    )
}

export default Login
