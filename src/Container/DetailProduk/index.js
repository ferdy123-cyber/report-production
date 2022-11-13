import { ImportOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Col, Image, Row, Typography } from "antd";
import { useEffect } from "react";
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
  console.log(produkState);
  return (
    <div>
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
        }}
      >
        {produkState.detailProduk && (
          <Row>
            {/* <Col span={18}>
              <Typography.Title level={2} style={{ color: color.white }}>
                {produkState.detailProduk.name}
              </Typography.Title>
            </Col> */}
            <Col span={10}>
              <Image
                src={BASE_URL + produkState.detailProduk.image}
                width={"100%"}
                style={{
                  aspectRatio: 1 / 1,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            </Col>
            <Col
              span={14}
              style={{ padding: 15, paddingLeft: 25, paddingTop: 0 }}
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
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default DetailProduk;
