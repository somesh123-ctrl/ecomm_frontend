import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Css/Orders.css";

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.cart;
  const price = location.state?.price;
  const name = location.state?.name;
  const email = location.state?.email;
  const address = location.state?.address;
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_QBDxd4PzN4Ck1m",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "https://ecomm-backend-hnkq.onrender.com/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          // You might want to redirect or handle successful payment here
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    navigate("/order-success");
  };

  const handleOnlinePayment = async () => {
    try {
      const orderUrl = "https://ecomm-backend-hnkq.onrender.com/online_payment";
      const { data } = await axios.post(orderUrl, { amount: price });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
    await sendOrderData();
  };

  const handleCashOnDelivery = async () => {
    try {
      await sendOrderData();
      navigate("/order-success");
    } catch (error) {
      console.log(error);
    }
  };

  const sendOrderData = async () => {
    try {
      await axios.post("https://ecomm-backend-hnkq.onrender.com/order", {
        items: data,
        total: price,
        name,
        email: user?.email,
        address,
      });
      console.log("Order placed successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="details">
            <h1>Order Details</h1>
          </div>
          <h4>
            Customer Name&nbsp;&nbsp;: &nbsp; <span>{name}</span>
          </h4>
          <h4>
            Delivery Address&nbsp;: &nbsp; <span>{address}</span>
          </h4>{" "}
          <table className="table">
            <thead>
              <tr className="tr1">
                <th> Product_Name</th>
                <th> Qty</th>
                <th> Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className="tr1" key={item.title}>
                  <td>{item.title}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr>
                <th>Total&nbsp; :&nbsp; {price} $</th>
              </tr>
            </tbody>
          </table>
          <div className="delivery">
            <h3>Choose Payment Mode:</h3>
            <button className="cash_payment" onClick={handleCashOnDelivery}>
              Cash On Delivery
            </button>
            <button className="online_payment" onClick={handleOnlinePayment}>
              Online Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
