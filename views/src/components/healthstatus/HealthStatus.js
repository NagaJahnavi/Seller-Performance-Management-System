import React, { useState } from "react";
import axios from "axios";

const HealthStatus = () => {
  const [orderDetails, setOrderDetails] = useState({
    sellerId: "",
    date1: "",
    date2: "",
    health: "",
    status: "",
  });
  const { sellerId, date1, date2, health, status } = orderDetails;
  const onChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const order = {
      sellerId,
      date1,
      date2,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(order);
      const res = await axios.post("/api/healthstatus", body, config);
      if (typeof res.data.health !== "undefined") {
        setOrderDetails({
          ...orderDetails,
          health: res.data.health.toString(),
          status: "",
        });
      } else {
        setOrderDetails({ ...orderDetails, status: res.data.status });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="display-4 my-3">Health Status</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-3">
            <input
              type="date"
              className="form-control"
              name="date1"
              value={date1}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-3">
            <input
              type="date"
              className="form-control"
              name="date2"
              value={date2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              placeholder="Seller ID"
              name="sellerId"
              value={sellerId}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col">
            <input type="submit" className="btn btn-dark" />
          </div>
        </div>
      </form>
      <div className="row my-5">
        <div className="col">
          {status !== "" && <div className="lead text-danger">{status}</div>}
          {status === "" && health !== "" && (
            <div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Health</td>
                    <td>{health}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthStatus;
