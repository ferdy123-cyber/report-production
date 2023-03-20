// import { Button, Checkbox, Form, Input } from "antd";
import { Form, Input, Button, Alert, message, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import logo from "../../Image/20221111_194411_0000.png";
import { login } from "../../Reducer/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.reducer);
  const onFinish = (values) => {
    values.navigate = navigate;
    dispatch(login(values));
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{
        width: "92%",
        maxWidth: "450px",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <div style={{ marginBottom: 30, textAlign: "center", opacity: 0.8 }}>
        <Image src={logo} width={150} height={150} alt="" preview={false} />
        <p style={{ fontSize: 20, fontWeight: 600, marginTop: 20 }}>
          Login ke akun kamu
        </p>
      </div>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Email tidak boleh kosong!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          // type=""
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password tidak boleh kosong!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        {userState.fetchingAuth ? (
          <Button
            loading
            type="primary"
            className="login-form-button warning"
            style={{
              backgroundColor: "#5d5c55",
              color: "white",
              border: "solid 1px #5d5c55",
              marginTop: "15px",
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button warning"
            style={{
              backgroundColor: "#5d5c55",
              color: "white",
              border: "solid 1px #5d5c55",
              marginTop: "15px",
            }}
          >
            Login
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default Login;
