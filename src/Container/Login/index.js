// import { Button, Checkbox, Form, Input } from "antd";
import {
  Form,
  Input,
  Button,
  Alert,
  message,
  Image,
  Modal,
  Select,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import logo from "../../Image/client-3.png";
import { login, register } from "../../Reducer/Action";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinishModal = (value) => {
    setIsModalOpen(false);
    dispatch(register(value));
    console.log(value);
  };
  return (
    <>
      <Modal
        footer={false}
        title="Register"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          onFinish={onFinishModal}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Username tidak boleh kosong!" },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email tidak boleh kosong!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password tidak boleh kosong!" },
            ]}
          >
            <Input type="password" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Ulangi Password"
            name="repassword"
            rules={[
              {
                required: true,
                message: "Ulangi password tidak boleh kosong!",
              },
            ]}
          >
            <Input type="password" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item style={{ textAlign: "end" }} wrapperCol={{ span: 24 }}>
            {userState.fetchingAdd ? (
              <Button type="primary" loading>
                Loading
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
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
          <Image src={logo} width={250} height={250} alt="" preview={false} />
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
          <Button
            onClick={() => setIsModalOpen(true)}
            style={{ marginLeft: 10 }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
