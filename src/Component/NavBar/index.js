import { Image, Typography, Input, Button } from "antd";
import logo from "../../Image/rlpTLlbMzTNYuZGGCVYM.png";
import { color } from "../../color";
import {
  BellOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import "./index.css";

const NavBar = () => {
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
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
        }}
        className="logo"
      >
        <Image src={logo} width={50} height={50} alt="" preview={false} />
        <Typography.Title
          style={{
            color: color.white,
            marginLeft: 10,
            fontWeight: 700,
            fontSize: 20,
            marginRight: 20,
          }}
          level={5}
        >
          jamtanganku.id
        </Typography.Title>
      </div>
      {/* <Search placeholder="input search text" 
      // onSearch={onSearch}
       enterButton /> */}
      <Input
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
          color: color.orange,
          marginLeft: 15,
          fontSize: 30,
        }}
      />
      <BellOutlined
        style={{
          color: color.orange,
          marginLeft: 15,
          fontSize: 30,
          marginRight: 15,
        }}
      />
      <Button
        style={{
          borderColor: color.orange,
          fontSize: 14,
          fontWeight: 600,
          color: color.orange,
          backgroundColor: "transparent",
        }}
      >
        Masuk
      </Button>
      <Button
        style={{
          borderColor: color.orange,
          fontSize: 14,
          fontWeight: 600,
          marginLeft: 15,
          color: color.black,
          backgroundColor: color.orange,
        }}
      >
        Masuk
      </Button>
    </div>
  );
};

export default NavBar;
