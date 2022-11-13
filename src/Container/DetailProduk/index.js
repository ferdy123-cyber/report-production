import { ImportOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Image, Input, InputNumber, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";
import { BASE_URL, getDetailProduk } from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";

const DetailProduk = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const produkState = useSelector((state) => state.produkReducer);
  useEffect(() => {
    dispatch(getDetailProduk(id));
  }, [id]);
  const [qty, setQty] = useState(1);
  console.log(qty);
  return (
    <>
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: color.black,
          color: color.white,
          paddingTop: 120,
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: 10,
          display: "flex",
        }}
      >
        {produkState.detailProduk && (
          <>
            <div
              style={{
                width: "40%",
                position: "sticky",
                height: "fit-content",
                top: 120,
                paddingBottom: 20,
              }}
            >
              <Image
                src={BASE_URL + produkState.detailProduk.image}
                width={"100%"}
                style={{
                  aspectRatio: 1 / 1,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            </div>
            <div
              style={{
                width: "60%",
                padding: 15,
                paddingLeft: 25,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <Typography.Title level={2} style={{ color: color.white }}>
                {produkState.detailProduk.name}
              </Typography.Title>
              {produkState.detailProduk.promo === "N" ? (
                <Typography.Title level={3} style={{ color: color.blue }}>
                  Rp{SeparatorRibuan(produkState.detailProduk.price)}
                </Typography.Title>
              ) : (
                <>
                  <Typography.Text style={{ color: "rgb(117,117,117)" }}>
                    <del>
                      Rp{SeparatorRibuan(produkState.detailProduk.price)}
                    </del>
                  </Typography.Text>
                  <Typography.Title
                    level={3}
                    style={{ color: color.blue, marginTop: 5 }}
                  >
                    Rp{SeparatorRibuan(produkState.detailProduk.price_promo)}
                  </Typography.Title>
                </>
              )}
              <Row style={{ marginTop: 20 }}>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: 25,
                  }}
                >
                  <ImportOutlined
                    style={{
                      color: color.white,
                      fontSize: 30,
                      marginRight: 10,
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <Typography.Text style={{ color: color.white }}>
                      Stok
                    </Typography.Text>
                    <br />
                    <Typography.Text
                      style={{ color: color.white, fontWeight: 700 }}
                    >
                      {produkState.detailProduk.stok}
                    </Typography.Text>
                  </div>
                </Col>
                <Col style={{ display: "flex", alignItems: "center" }}>
                  <ShoppingOutlined
                    style={{
                      color: color.white,
                      fontSize: 30,
                      marginRight: 10,
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <Typography.Text style={{ color: color.white }}>
                      Terjual
                    </Typography.Text>
                    <br />
                    <Typography.Text
                      style={{ color: color.white, fontWeight: 700 }}
                    >
                      {produkState.detailProduk.amount_of_selling}
                    </Typography.Text>
                  </div>
                </Col>
              </Row>
              <Button
                onClick={() => {
                  if (qty <= 1) {
                    setQty(1);
                  } else {
                    setQty(qty - 1);
                  }
                }}
              >
                -
              </Button>
              <Input
                type={"number"}
                value={qty}
                onChange={(val) => {
                  if (val.target.value.length <= 3) {
                    setQty(Number(val.target.value));
                  }
                }}
                style={{
                  marginTop: 15,
                  width: 50,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              />
              <Button
                onClick={() => {
                  setQty(qty + 1);
                }}
              >
                +
              </Button>
              <div style={{ marginTop: 20 }}>
                <Button
                  style={{
                    width: 200,
                    height: 50,
                    borderColor: color.blue,
                    fontSize: 14,
                    fontWeight: 600,
                    color: color.blue,
                    backgroundColor: "transparent",
                  }}
                >
                  + Keranjang
                </Button>
                <Button
                  style={{
                    width: 200,
                    height: 50,
                    borderColor: color.blue,
                    fontSize: 14,
                    fontWeight: 600,
                    marginLeft: 15,
                    color: color.black,
                    backgroundColor: color.blue,
                  }}
                >
                  Beli Langsung
                </Button>
              </div>
              <Typography.Title
                level={5}
                style={{ color: color.blue, marginTop: 25 }}
              >
                Deskripsi Produk
              </Typography.Title>
              <Typography.Paragraph
                style={{ color: color.white, marginTop: 15 }}
              >
                {produkState.detailProduk.description}
              </Typography.Paragraph>
            </div>
          </>
        )}
      </div>
      {/* <div
        style={{ width: "100%", height: 1000, backgroundColor: "red" }}
      ></div> */}
    </>
  );
};

export default DetailProduk;
