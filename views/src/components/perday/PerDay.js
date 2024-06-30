import React, { useState } from "react";
import axios from "axios";

const PerDay = () => {
  const [orderDetails, setOrderDetails] = useState({
    sellerId: "",
    orderDate: "",
    delivery: "",
    shipping: "",
    returnData: "",
    cancel: "",
    status: "",
  });
  const {
    sellerId,
    orderDate,
    delivery,
    shipping,
    returnData,
    cancel,
    status,
  } = orderDetails;
  const onChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const order = {
      sellerId,
      orderDate,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(order);
      const res = await axios.post("/api/perday", body, config);
      if (typeof res.data.del !== "undefined") {
        setOrderDetails({
          ...orderDetails,
          delivery: res.data.del.toString(),
          shipping: res.data.ship.toString(),
          returnData: res.data.ret.toString(),
          cancel: res.data.cancel.toString(),
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
      <div className="display-4 my-3">Per Day</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Seller ID"
              name="sellerId"
              value={sellerId}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-4">
            <input
              type="date"
              className="form-control"
              name="orderDate"
              onfocus="(this.type='date')"
              value={orderDate}
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
          {status === "" && delivery !== "" && (
            <div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Delivery</td>
                    <td>{delivery}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>{shipping}</td>
                  </tr>
                  <tr>
                    <td>Return</td>
                    <td>{returnData}</td>
                  </tr>
                  <tr>
                    <td>Cancel</td>
                    <td>{cancel}</td>
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

export default PerDay;
