import { Image, Typography, Input, Button } from "antd";
import logo from "../../Image/20221111_194411_0000.png";
import { color } from "../../color";
import { BellOutlined, ShoppingOutlined } from "@ant-design/icons";
import "./index.css";
import { useNavigate } from "react-router";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
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
      <ShoppingOutlined
        style={{
          color: color.blue,
          marginLeft: 15,
          fontSize: 30,
        }}
      />
      <BellOutlined
        style={{
          color: color.blue,
          marginLeft: 15,
          fontSize: 30,
          marginRight: 15,
        }}
      />
      <Button
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
    </div>
  );
};

export default NavBar;
