import { Carousel, Col, Image, Pagination, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";
import {
  BASE_URL,
  getListPoster,
  getListProduk,
  getListProdukPromo,
  getListProdukRekomended,
} from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";
import "./index.css";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListPoster({ limit: 3 }));
    dispatch(getListProdukPromo({ limit: 6 }));
    dispatch(getListProdukRekomended({ limit: 6 }));
  }, []);
  const [param, setparam] = useState({ limit: 24, offset: 0 });
  const [page, setpage] = useState(1);
  useEffect(() => {
    dispatch(getListProduk(param));
  }, [param]);
  const adminState = useSelector((state) => state.adminReducer);
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
        <Carousel
          style={{
            width: "85%",
            margin: "auto",
            borderRadius: 10,
            overflow: "hidden",
          }}
          autoplay
        >
          {adminState.listPoster &&
            adminState.listPoster.data.map((e) => {
              return (
                <Image
                  preview={false}
                  src={BASE_URL + e.image}
                  width={"100%"}
                />
              );
            })}
        </Carousel>
        <Typography.Title
          level={3}
          style={{ color: color.blue, fontWeight: 600, marginTop: 20 }}
        >
          Promo
        </Typography.Title>
        <Row gutter={[24, 30]}>
          {adminState.listProdukPromo &&
            adminState.listProdukPromo.data.map((e) => {
              return (
                <Col key={e.id} span={4} style={{ cursor: "pointer" }}>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#333",
                      borderRadius: 5,
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px 0px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      preview={false}
                      src={BASE_URL + e.image}
                      width={"100%"}
                      style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
                    />
                    <div
                      style={{
                        width: "100%",
                        padding: "10px",
                      }}
                    >
                      <Typography.Paragraph
                        ellipsis={{ rows: 2, expandable: false }}
                        style={{ color: color.white }}
                        level={5}
                      >
                        {e.name}
                      </Typography.Paragraph>
                      <Typography.Text
                        style={{ color: color.blue, fontWeight: 700 }}
                        level={5}
                      >
                        Rp{SeparatorRibuan(e.price_promo)}
                      </Typography.Text>
                      <br />
                      <Typography.Text
                        style={{
                          color: "rgb(117,117,117)",
                          fontWeight: 700,
                          fontSize: 11,
                          marginTop: -150,
                        }}
                        level={5}
                      >
                        <del>Rp{SeparatorRibuan(e.price)}</del>
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
        <Typography.Title
          level={3}
          style={{ color: color.blue, fontWeight: 600, marginTop: 40 }}
        >
          Semua Produk
        </Typography.Title>
        <Row gutter={[24, 30]} justify={"start"}>
          {adminState.listProduk &&
            adminState.listProduk.data.map((e) => {
              return (
                <Col
                  key={e.id}
                  span={4}
                  // offset={1}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#333",
                      borderRadius: 5,
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px 0px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      preview={false}
                      src={BASE_URL + e.image}
                      width={"100%"}
                      style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
                    />
                    {e.promo === "Y" ? (
                      <div
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      >
                        <Typography.Paragraph
                          ellipsis={{ rows: 2, expandable: false }}
                          style={{ color: color.white }}
                          level={5}
                        >
                          {e.name}
                        </Typography.Paragraph>
                        <Typography.Text
                          style={{ color: color.blue, fontWeight: 700 }}
                          level={5}
                        >
                          Rp{SeparatorRibuan(e.price_promo)}
                        </Typography.Text>
                        <br />
                        <Typography.Text
                          style={{
                            color: "rgb(117,117,117)",
                            fontWeight: 700,
                            fontSize: 11,
                            marginTop: -150,
                          }}
                          level={5}
                        >
                          <del>Rp{SeparatorRibuan(e.price)}</del>
                        </Typography.Text>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      >
                        <Typography.Paragraph
                          ellipsis={{ rows: 2, expandable: false }}
                          style={{ color: color.white }}
                          level={5}
                        >
                          {e.name}
                        </Typography.Paragraph>
                        <Typography.Text
                          style={{ color: color.blue, fontWeight: 700 }}
                          level={5}
                        >
                          Rp{SeparatorRibuan(e.price)}
                        </Typography.Text>
                      </div>
                    )}
                  </div>
                </Col>
              );
            })}
        </Row>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 35,
          }}
        >
          <Pagination
            current={page}
            pageSize={param.limit}
            total={adminState.listProduk && adminState.listProduk.total}
            onChange={(page) => {
              setpage(page);
              setparam({ ...param, offset: param.limit * (page - 1) });
            }}
          />
        </div>
        <Typography.Title
          level={3}
          style={{ color: color.blue, fontWeight: 600, marginTop: 20 }}
        >
          Rekomendasi
        </Typography.Title>
        <Row gutter={[24, 30]}>
          {adminState.listProdukRekomended &&
            adminState.listProdukRekomended.data.map((e) => {
              return (
                <Col key={e.id} span={4} style={{ cursor: "pointer" }}>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#333",
                      borderRadius: 5,
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px 0px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      preview={false}
                      src={BASE_URL + e.image}
                      width={"100%"}
                      style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
                    />
                    {e.promo === "Y" ? (
                      <div
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      >
                        <Typography.Paragraph
                          ellipsis={{ rows: 2, expandable: false }}
                          style={{ color: color.white }}
                          level={5}
                        >
                          {e.name}
                        </Typography.Paragraph>
                        <Typography.Text
                          style={{ color: color.blue, fontWeight: 700 }}
                          level={5}
                        >
                          Rp{SeparatorRibuan(e.price_promo)}
                        </Typography.Text>
                        <br />
                        <Typography.Text
                          style={{
                            color: "rgb(117,117,117)",
                            fontWeight: 700,
                            fontSize: 11,
                            marginTop: -150,
                          }}
                          level={5}
                        >
                          <del>Rp{SeparatorRibuan(e.price)}</del>
                        </Typography.Text>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      >
                        <Typography.Paragraph
                          ellipsis={{ rows: 2, expandable: false }}
                          style={{ color: color.white }}
                          level={5}
                        >
                          {e.name}
                        </Typography.Paragraph>
                        <Typography.Text
                          style={{ color: color.blue, fontWeight: 700 }}
                          level={5}
                        >
                          Rp{SeparatorRibuan(e.price)}
                        </Typography.Text>
                      </div>
                    )}
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};

export default Home;
