import React, { useState } from "react";
import "../Css/Form.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);

  //form handler
  const onfinishHandler = async (values) => {
    console.log(values);
    setButtonLoading(true);
    try {
      const res = await axios.post(
        "https://ecomm-backend-hnkq.onrender.com/user/register",
        values
      );

      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
    setButtonLoading(false);
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/login" className="m-2">
          Already a user? Login here
        </Link>
        <button className="btn btn-primary" type="submit" disabled={buttonLoading}>
          {buttonLoading ? "Loading..." : "Register"}
        </button>
      </Form>
    </div>
  );
};

export default Register;
