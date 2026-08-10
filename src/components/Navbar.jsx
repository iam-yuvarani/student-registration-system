import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="logo">
       📋 Employee Management System
      </div>

      <div className="nav-links">

        {!isHomePage && (
          <Link to="/">Home</Link>
        )}

        <div className="profile-container">
          <button
            className="profile-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            🧑🏻‍💻
          </button>

          {showMenu && (
            <div className="profile-menu">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;