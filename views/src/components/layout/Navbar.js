import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-black">
        <div className="container">
          <span className="navbar-brand">Seller Performance</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
