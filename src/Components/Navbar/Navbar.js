import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar/Navbar.css';
import logo from '../image/logo6.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isloggedin, setloggedin , userId}) => {
  const navigate = useNavigate();

  return (
    <nav>
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        {!isloggedin ? (
          <>
            <li><NavLink to="/">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/home">Home</NavLink></li>
            <button className='navbutton' 
              onClick={() => {
                setloggedin(false);
                localStorage.removeItem('isloggedin'); 
                localStorage.removeItem('userId');
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

