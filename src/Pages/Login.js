import React, { useEffect, useState } from "react";
import "../Css/Form.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const onfinishHandler = async (values) => {
    setButtonLoading(true);
    try {
      const res = await axios.post("https://ecomm-backend-hnkq.onrender.com/user/login", values);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/products");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
    setButtonLoading(false);
  };

  return (
    <div className="form-container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="register-form"
          >
            <h3 className="text-center">Login Form</h3>

            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <Link to="/register" className="m-2">
              Not a user? Register here
            </Link>
            <button className="btn btn-primary" type="submit" disabled={buttonLoading}>
              {buttonLoading ? "Loading..." : "Login"}
            </button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Login;
