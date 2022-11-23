import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Result,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";
import {
  BASE_URL,
  checkout,
  deleteListCart,
  getListCart,
  getListProdukRekomended,
} from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";
import { DeleteOutlined } from "@ant-design/icons";
import Skeleton from "react-loading-skeleton";
import QRCode from "react-qr-code";

const Cart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const produkReducer = useSelector((state) => state.produkReducer);
  const member_credent = JSON.parse(localStorage.getItem("member_credent"));
  useEffect(() => {
    if (id !== member_credent.id) {
      navigate("/");
      return;
    }
    dispatch(getListProdukRekomended({ limit: 12 }));
    dispatch(getListCart(member_credent.id));
  }, [id]);

  const totalPrice =
    produkReducer.listCart &&
    produkReducer.listCart.data
      .map((e) => ({
        cart_id: e.cart_id,
        user_id: e.user_id,
        // price: e.promo === "Y" ? e.price_promo : e.price,
        price: e.price * e.quantity,
      }))
      .map((val) => Number(val.price))
      .reduce((a, b) => a + b, 0);
  const totalDiscount =
    produkReducer.listCart &&
    produkReducer.listCart.data
      .filter((e) => e.promo === "Y")
      .map((e) => ({
        cart_id: e.cart_id,
        user_id: e.user_id,
        promo: (e.price - e.price_promo) * e.quantity,
      }))
      .map((val) => Number(val.promo))
      .reduce((a, b) => a + b, 0);

  const totalQty =
    produkReducer.listCart &&
    produkReducer.listCart.data
      .map((qty) => Number(qty.quantity))
      .reduce((a, b) => a + b, 0);

  const adminState = useSelector((state) => state.adminReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = (value) => {
    if (value.metode_pembayaran === "Transfer") {
      value.status_transaksi = "Menunggu Pembayaran";
    } else {
      value.status_transaksi = "Berhasil";
    }
    value.nomor_transaksi = Math.floor(Math.random() * 1100000000);
    value.user_id = member_credent.id;
    value.total_price = totalPrice - totalDiscount;
    value.navigate = navigate;
    // console.log(value);
    dispatch(checkout(value));
    form.resetFields();
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  return (
    <>
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
          Checkout
        </Typography.Title>
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="metode_pembayaran"
            rules={[
              {
                required: true,
                message: "Metode pembayaran tidak boleh kosong!",
              },
            ]}
          >
            <Select
              placeholder="Metode Pembayaran"
              style={{
                marginTop: 10,
              }}
            >
              <Select.Option value="Bayar Ditempat">
                Bayar Ditempat
              </Select.Option>
              <Select.Option value="Transfer">Transfer JKpay</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            // label="Nama"
            name="alamat_tujuan"
            rules={[
              { required: true, message: "Password tidak boleh kosong!" },
            ]}
          >
            <Input.TextArea rows={6} placeholder="Alamat Tujuan" />
          </Form.Item>

          <Form.Item style={{ textAlign: "end" }} wrapperCol={{ span: 24 }}>
            {adminState.fetching ? (
              <Button type="primary" loading>
                Loading
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Beli (Rp{SeparatorRibuan(totalPrice - totalDiscount)})
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
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
        {produkReducer.listCart &&
          produkReducer.listCart.data.length === 0 &&
          (!adminState.fetching || !produkReducer.fetching) && (
            <Result
              style={{ width: "100%" }}
              status="404"
              title={
                <Typography.Text style={{ color: color.white }}>
                  Keranjang belanja kosong
                </Typography.Text>
              }
              subTitle={
                <Typography.Text style={{ color: color.white }}>
                  Isi dengan barang yang kamu suka
                </Typography.Text>
              }
              extra={
                <Button
                  style={{
                    backgroundColor: color.blue,
                    borderColor: color.blue,
                    borderRadius: 10,
                    color: color.white,
                  }}
                  onClick={() => navigate("/")}
                  // type="primary"
                >
                  Mulai Belanja
                </Button>
              }
            />
          )}
        {(adminState.fetching || produkReducer.fetching) && (
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "70%" }}>
              <Skeleton
                count={5}
                duration={1.5}
                baseColor="#3f3f3f"
                style={{
                  width: "100%",
                  height: 120,
                  aspectRatio: 1 / 1,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
            </div>
            <div
              style={{
                width: "30%",
                position: "sticky",
                top: 120,
                height: "fit-content",
              }}
            >
              <Skeleton
                duration={1.5}
                baseColor="#3f3f3f"
                style={{
                  width: "100%",
                  height: 250,
                  aspectRatio: 1 / 1,
                  borderRadius: 10,
                  marginLeft: 15,
                }}
              />
            </div>
          </div>
        )}
        {produkReducer.listCart &&
          produkReducer.listCart.data &&
          (!adminState.fetching || !produkReducer.fetching) &&
          produkReducer.listCart.data.length !== 0 && (
            <>
              <div style={{ width: "70%" }}>
                <Typography.Title
                  level={3}
                  style={{ color: color.blue, fontWeight: 600 }}
                >
                  Keranjang
                </Typography.Title>
                {produkReducer.listCart.data.map((e) => {
                  return (
                    <div
                      key={e.cart_id}
                      style={{
                        width: "100%",
                        backgroundColor: "#333",
                        borderRadius: 10,
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px 0px",
                        overflow: "hidden",
                        padding: 15,
                        marginBottom: 15,
                        display: "flex",
                      }}
                    >
                      <Image
                        preview={false}
                        src={BASE_URL + e.image}
                        style={{
                          width: 100,
                          aspectRatio: 1 / 1,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                      />
                      <div
                        style={{
                          marginLeft: 10,
                          width: "100%",
                          height: "100px",
                          display: "block",
                          position: "relative",
                        }}
                      >
                        <Typography.Title
                          level={5}
                          style={{ color: color.white }}
                        >
                          {e.name}
                        </Typography.Title>
                        {e.promo == "N" ? (
                          <Typography.Text style={{ color: color.blue }}>
                            Rp{SeparatorRibuan(e.price)} x {e.quantity}
                          </Typography.Text>
                        ) : (
                          <Typography.Text style={{ color: color.blue }}>
                            <del style={{ color: color.white, fontSize: 12 }}>
                              Rp{SeparatorRibuan(e.price)}
                            </del>{" "}
                            Rp
                            {SeparatorRibuan(e.price_promo)} x {e.quantity}
                          </Typography.Text>
                        )}
                        <div
                          onClick={() =>
                            dispatch(
                              deleteListCart({
                                id: e.cart_id,
                                user_id: member_credent.id,
                              })
                            )
                          }
                          style={{
                            width: "100%",
                            textAlign: "end",
                            position: "absolute",
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                            cursor: "pointer",
                          }}
                        >
                          <DeleteOutlined
                            style={{
                              fontSize: 20,
                              color: "#ff4d4f",
                              marginRight: 5,
                            }}
                          />
                          <Typography.Text style={{ color: "#ff4d4f" }}>
                            Hapus
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Typography.Title
                  level={3}
                  style={{ color: color.blue, fontWeight: 600, marginTop: 40 }}
                >
                  Rekomendasi untukmu
                </Typography.Title>
                <Row gutter={[24, 30]}>
                  {!adminState.fetching &&
                    adminState.listProdukRekomended &&
                    adminState.listProdukRekomended.data.map((e) => {
                      return (
                        <Col
                          onClick={() => navigate(`/detail/${e.id}`)}
                          key={e.id}
                          span={6}
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
              </div>
              <div
                style={{
                  width: "30%",
                  paddingLeft: "15px",
                  position: "sticky",
                  top: 163.5,
                  height: "fit-content",
                  marginTop: 43.5,
                }}
              >
                <div
                  style={{
                    borderRadius: 10,
                    padding: "15px 15px",
                    width: "100%%",
                    backgroundColor: "#333",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px 0px",
                  }}
                >
                  <Typography.Title style={{ color: color.white }} level={5}>
                    Ringkasan Belanja
                  </Typography.Title>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Typography.Text style={{ color: color.white }}>
                      Total Barang ({totalQty} barang)
                    </Typography.Text>
                    <Typography.Text style={{ color: color.white }}>
                      Rp{SeparatorRibuan(totalPrice)}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography.Text style={{ color: color.white }}>
                      Total diskon barang
                    </Typography.Text>
                    <Typography.Text style={{ color: color.white }}>
                      Rp{SeparatorRibuan(totalDiscount)}
                    </Typography.Text>
                  </div>
                  <Divider style={{ backgroundColor: color.white }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography.Text
                      style={{ color: color.white, fontWeight: 600 }}
                    >
                      Total harga
                    </Typography.Text>
                    <Typography.Text
                      style={{ color: color.white, fontWeight: 600 }}
                    >
                      Rp{SeparatorRibuan(totalPrice - totalDiscount)}
                    </Typography.Text>
                  </div>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      marginTop: 15,
                      width: "100%",
                      borderRadius: 10,
                      height: 40,
                      fontSize: 16,
                      fontWeight: 600,
                      color: color.white,
                      backgroundColor: color.blue,
                      borderColor: color.blue,
                    }}
                  >
                    Beli ({totalQty})
                  </Button>
                </div>
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default Cart;
