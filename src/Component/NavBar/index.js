import {
  Image,
  Typography,
  Input,
  Button,
  Modal,
  Form,
  Popover,
  message,
  Badge,
} from "antd";
import logo from "../../Image/20221111_194411_0000.png";
import { color } from "../../color";
import {
  BellOutlined,
  CaretDownOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getListCart, loginMember, registerMember } from "../../Reducer/Action";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const produkReducer = useSelector((state) => state.produkReducer);
  const member_credent = JSON.parse(localStorage.getItem("member_credent"));
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const adminState = useSelector((state) => state.adminReducer);
  const onFinish = (value) => {
    value.tanggal_input = moment().format("YYYY-MM-DD");
    value.role_id = 2;
    value.is_active = 1;
    value.alamat = "";
    dispatch(registerMember(value));
  };
  const onFinish2 = (value) => {
    // console.log(value);
    dispatch(loginMember(value));
  };
  useEffect(() => {
    member_credent && dispatch(getListCart(member_credent.id));
  }, []);
  // console.log(produkReducer.listCart && produkReducer.listCart.data.length);
  return (
    <div
      style={{
        width: "100vw",
        height: 80,
        backgroundColor: color.black,
        display: "flex",
        alignItems: "center",
        paddingLeft: "10%",
        paddingRight: "10%",
        position: "fixed",
        zIndex: 99,
      }}
    >
      <Modal
        width={400}
        bodyStyle={{
          backgroundColor: "#3f3f3f",
          overflow: "hidden",
        }}
        footer={false}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <Typography.Title style={{ color: color.blue }} level={3}>
          Daftar
        </Typography.Title>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            // label="Nama"
            name="nama"
            rules={[{ required: true, message: "Nama tidak boleh kosong!" }]}
          >
            <Input
              placeholder="Nama"
              maxLength={10}
              style={{
                color: color.white,
                borderRadius: 5,
                backgroundColor: "#333",
                borderColor: "rgb(133, 133, 133)",
                height: 50,
                fontSize: 14,
                marginTop: 10,
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email tidak boleh kosong!" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input
              placeholder="Email"
              style={{
                color: color.white,
                borderRadius: 5,
                backgroundColor: "#333",
                borderColor: "rgb(133, 133, 133)",
                height: 50,
                fontSize: 14,
                marginTop: 5,
              }}
            />
          </Form.Item>

          <Form.Item
            // label="Nama"
            name="password"
            rules={[
              { required: true, message: "Password tidak boleh kosong!" },
            ]}
          >
            <Input
              type={"password"}
              placeholder="Password"
              style={{
                color: color.white,
                borderRadius: 5,
                backgroundColor: "#333",
                borderColor: "rgb(133, 133, 133)",
                height: 50,
                fontSize: 14,
                marginTop: 10,
              }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "end" }} wrapperCol={{ span: 24 }}>
            {adminState.fetching ? (
              <Button type="primary" loading>
                Loading
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Daftar
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        width={400}
        bodyStyle={{
          backgroundColor: "#3f3f3f",
          overflow: "hidden",
        }}
        footer={false}
        open={isModalOpen2}
        onOk={() => {
          setIsModalOpen2(false);
        }}
        onCancel={() => setIsModalOpen2(false)}
      >
        <Typography.Title style={{ color: color.blue }} level={3}>
          Masuk
        </Typography.Title>
        <Form name="basic" onFinish={onFinish2} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email tidak boleh kosong!" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input
              placeholder="Email"
              style={{
                color: color.white,
                borderRadius: 5,
                backgroundColor: "#333",
                borderColor: "rgb(133, 133, 133)",
                height: 50,
                fontSize: 14,
                marginTop: 5,
              }}
            />
          </Form.Item>

          <Form.Item
            // label="Nama"
            name="password"
            rules={[
              { required: true, message: "Password tidak boleh kosong!" },
            ]}
          >
            <Input
              type={"password"}
              placeholder="Password"
              style={{
                color: color.white,
                borderRadius: 5,
                backgroundColor: "#333",
                borderColor: "rgb(133, 133, 133)",
                height: 50,
                fontSize: 14,
                marginTop: 10,
              }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "end" }} wrapperCol={{ span: 24 }}>
            {adminState.fetching ? (
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
      <div
        onClick={() => navigate("/")}
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        className="logo"
      >
        <Image src={logo} width={50} height={50} alt="" preview={false} />
        <Typography.Title
          style={{
            color: color.white,
            fontWeight: 700,
            fontSize: 20,
            marginRight: 20,
            marginTop: 10,
          }}
          level={5}
        >
          jamtanganku.id
        </Typography.Title>
      </div>
      <Input
        value={search}
        onPressEnter={() => {
          if (search !== "") {
            navigate(`/q/${search}`);
          }
        }}
        onChange={(val) => setSearch(val.target.value)}
        placeholder="Cari produk..."
        style={{
          color: color.white,
          borderRadius: 5,
          backgroundColor: "#333",
          borderColor: "rgb(133, 133, 133)",
          height: 50,
          fontSize: 14,
        }}
      />
      <Badge
        size="small"
        count={
          produkReducer.listCart &&
          produkReducer.listCart.data
            .map((qty) => Number(qty.quantity))
            .reduce((a, b) => a + b, 0)
        }
      >
        <ShoppingOutlined
          onClick={() => {
            if (member_credent) {
              navigate(`/cart/${member_credent.id}`);
            } else {
              setIsModalOpen2(true);
            }
          }}
          style={{
            color: color.blue,
            marginLeft: 15,
            fontSize: 30,
            cursor: "pointer",
          }}
        />
      </Badge>

      <BellOutlined
        onClick={() => {
          if (member_credent) {
            navigate(`/history/${member_credent.id}`);
          } else {
            setIsModalOpen2(true);
          }
        }}
        style={{
          color: color.blue,
          marginLeft: 15,
          fontSize: 30,
          marginRight: 15,
        }}
      />
      {member_credent ? (
        <Popover
          color={"#3f3f3f"}
          content={
            <Typography.Text
              // className="logoutBtn"
              style={{ color: color.white, cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("member_credent");
                message.success("Berhasil logout");
                window.location.reload(false);
              }}
            >
              Logout
            </Typography.Text>
          }
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <UserOutlined
              style={{
                color: color.blue,
                marginLeft: 15,
                fontSize: 20,
                marginRight: 10,
              }}
            />
            <Typography.Text style={{ color: color.white, fontWeight: 700 }}>
              {member_credent.nama}
            </Typography.Text>
            <CaretDownOutlined
              style={{
                color: color.blue,
                marginLeft: 10,
                fontSize: 12,
                // marginRight: 10,
              }}
            />
          </div>
        </Popover>
      ) : (
        <>
          <Button
            onClick={() => setIsModalOpen2(true)}
            style={{
              borderColor: color.blue,
              fontSize: 14,
              fontWeight: 600,
              color: color.blue,
              backgroundColor: "transparent",
            }}
          >
            Masuk
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            style={{
              borderColor: color.blue,
              fontSize: 14,
              fontWeight: 600,
              marginLeft: 15,
              color: color.black,
              backgroundColor: color.blue,
            }}
          >
            Daftar
          </Button>
        </>
      )}
    </div>
  );
};

export default NavBar;
