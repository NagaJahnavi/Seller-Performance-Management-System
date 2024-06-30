import React, { useState } from "react";
import axios from "axios";

const PerOrder = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    delivery: "",
    shipping: "",
    returnData: "",
    cancel: "",
    cancel_origin: "",
    status: "",
  });
  const {
    orderId,
    delivery,
    shipping,
    returnData,
    cancel,
    status,
  } = orderDetails;
  const onChange = (e) => {
    setOrderDetails({ ...orderDetails, orderId: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const order = {
      orderId,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(order);
      const res = await axios.post("/api/perorder", body, config);
      if (typeof res.data.delivery !== "undefined") {
        setOrderDetails({
          ...orderDetails,
          delivery: res.data.delivery.toString(),
          shipping: res.data.shipping.toString(),
          returnData: res.data.return.toString(),
          cancel: res.data.cancel.toString(),
          status: "",
        });
      } else {
        setOrderDetails({ ...orderDetails, status: res.data.status });
      }
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="display-4 my-3">Per Order</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Order ID"
              name="orderId"
              value={orderId}
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

export default PerOrder;
