// client/src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BlogApp
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-item">Home</Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link to="/login" className="navbar-item">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="navbar-item">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/create" className="navbar-item">Create Post</Link>
              </li>
              <li>
                <button className="navbar-logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
