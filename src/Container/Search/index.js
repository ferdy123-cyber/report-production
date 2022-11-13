import { Button, Col, Image, Pagination, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";
import {
  BASE_URL,
  getListProduk,
  getListProdukByTerlaris,
} from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";

const Search = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [param, setparam] = useState({ limit: 24, offset: 0 });
  const [page, setpage] = useState(1);
  useEffect(() => {
    dispatch(getListProduk(param));
  }, [param]);
  useEffect(() => {
    setparam({ ...param, name: key });
  }, [key]);
  const adminState = useSelector((state) => state.adminReducer);
  const [sort, setSort] = useState("terbaru");

  return (
    <div>
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: color.black,
          color: color.white,
          paddingTop: 100,
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: 10,
        }}
      >
        <Typography.Text
          level={4}
          style={{
            color: color.white,
            fontWeight: 600,
            marginTop: 20,
            fontSize: 22,
          }}
        >
          Menampilkan hasil untuk{" "}
          <span
            style={{
              color: color.blue,
            }}
          >
            {key}
          </span>
        </Typography.Text>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Button
            onClick={() => {
              dispatch(getListProduk(param));
              setSort("terbaru");
            }}
            style={
              sort === "terbaru"
                ? {
                    borderRadius: 10,
                    borderColor: color.blue,
                    fontSize: 14,
                    fontWeight: 600,
                    color: color.black,
                    backgroundColor: color.blue,
                  }
                : {
                    borderRadius: 10,
                    borderColor: color.blue,
                    fontSize: 14,
                    fontWeight: 600,
                    color: color.blue,
                    backgroundColor: "transparent",
                  }
            }
          >
            Terbaru
          </Button>
          <Button
            onClick={() => {
              dispatch(getListProdukByTerlaris(param));
              setSort("terlaris");
            }}
            style={
              sort === "terlaris"
                ? {
                    borderRadius: 10,
                    borderColor: color.blue,
                    fontSize: 14,
                    fontWeight: 600,
                    color: color.black,
                    backgroundColor: color.blue,
                    marginLeft: 15,
                  }
                : {
                    borderRadius: 10,
                    borderColor: color.blue,
                    fontSize: 14,
                    fontWeight: 600,
                    color: color.blue,
                    backgroundColor: "transparent",
                    marginLeft: 15,
                  }
            }
          >
            Terlaris
          </Button>
        </div>
        {adminState.fetching ? (
          <Row gutter={[24, 30]} style={{ marginTop: 30, marginBottom: 20 }}>
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e, index) => {
              return (
                <Col key={index} span={4}>
                  <Skeleton
                    duration={1.5}
                    baseColor="#3f3f3f"
                    style={{
                      width: "100%",
                      margin: "auto",
                      height: 250,
                      borderRadius: 10,
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Row gutter={[24, 30]} justify={"start"} style={{ marginTop: 20 }}>
            {adminState.listProduk &&
              adminState.listProduk.data.map((e) => {
                return (
                  <Col
                    onClick={() => navigate(`/detail/${e.id}`)}
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
        )}
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
      </div>
    </div>
  );
};
export default Search;
