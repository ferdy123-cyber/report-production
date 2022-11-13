import { Col, Row } from "antd";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";

const DetailProduk = () => {
  return (
    <div>
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: color.black,
          color: color.white,
          paddingTop: 100,
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: 10,
        }}
      >
        <Row>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailProduk;
