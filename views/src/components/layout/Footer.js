import React from "react";

const Footer = () => {
  
  return (
    <footer id="main-footer" className="text-center p-2 bg-black">
        <div className="container">
          <div className="row">
            <div className="col">
              <h5>Seller Performance</h5>
              <p>
                Copyright &copy;<span id="year"></span>
              </p>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;