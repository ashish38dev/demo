import React from 'react';
import './Header.css'; // Import your CSS file for styling
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const Nav = useNavigate()

    const handleLogout = () => {
        // Remove the token cookie
        Cookies.remove('token');
        Nav('/')
        // Redirect the user or perform any other necessary actions
      };

  return (
    <header className="header">
      <Link  className="link-style" to={'/dashboard'}><div className="logo">Home</div></Link>
      <div className="spacer" />
      <div className="buttons">
        <Link className="link-style" to={'/addemployee'} ><div className="button">Add Employee</div></Link>
        <button className="button" onClick={() => handleLogout()} >Logout</button>
      </div>
    </header>
  );
};

export default Header;
