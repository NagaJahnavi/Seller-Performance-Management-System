import React from "react";
import { Link } from "react-router-dom";
import sellersvg from "./undraw_deliveries_131a.svg";

const Landing = () => {
  return (
    <div className="row mt-5">
      <div className="col-md-7 svg">
        <img src={sellersvg} width="100%" height="100%" alt="" />
      </div>
      <div className="col">
        <div className="display-3 text-center">Welcome!</div>
        <Link to="/perorder" style={{ textDecoration: "none" }}>
          <div className="shadow m-5 p-2 text-center lead text-dark">
            Per Order
          </div>
        </Link>
        <Link to="/perday" style={{ textDecoration: "none" }}>
          <div className="shadow m-5 p-2 text-center lead text-dark">
            Per Day
          </div>
        </Link>
        <Link to="/healthstatus" style={{ textDecoration: "none" }}>
          <div className="shadow m-5 p-2 text-center lead text-dark">
            Health Status
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
