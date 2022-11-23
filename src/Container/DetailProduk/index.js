import { ImportOutlined, ShoppingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
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
  addToCart,
  BASE_URL,
  buyNow,
  getDetailProduk,
} from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";
import Skeleton from "react-loading-skeleton";

const DetailProduk = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigation = useNavigate();
  const member_credent = JSON.parse(localStorage.getItem("member_credent"));
  const produkState = useSelector((state) => state.produkReducer);
  useEffect(() => {
    dispatch(getDetailProduk(id));
  }, [id]);
  const [form] = Form.useForm();
  const adminState = useSelector((state) => state.adminReducer);
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (value) => {
    value.produk_id = produkState.detailProduk.id;
    value.quantity = qty;
    value.user_id = member_credent.id;
    if (value.metode_pembayaran === "Transfer") {
      value.status_transaksi = "Menunggu Pembayaran";
    } else {
      value.status_transaksi = "Berhasil";
    }
    value.nomor_transaksi = Math.floor(Math.random() * 1100000000);
    dispatch(
      buyNow({
        cart: {
          produk_id: value.produk_id,
          user_id: value.user_id,
          quantity: value.quantity,
        },
        checkout: {
          user_id: value.user_id,
          alamat_tujuan: value.alamat_tujuan,
          metode_pembayaran: value.metode_pembayaran,
          nomor_transaksi: value.nomor_transaksi,
          total_price:
            produkState.detailProduk.promo === "N"
              ? Number(produkState.detailProduk.price * qty)
              : Number(produkState.detailProduk.price_promo * qty),
          status_transaksi: value.status_transaksi,
          navigate: navigation,
        },
      })
    );
    form.resetFields();
    setIsModalOpen(false);
  };
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
          Beli Langsung
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
                Beli (Rp
                {produkState.detailProduk &&
                  (produkState.detailProduk.promo === "N"
                    ? SeparatorRibuan(produkState.detailProduk.price * qty)
                    : SeparatorRibuan(
                        produkState.detailProduk.price_promo * qty
                      ))}
                )
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
        {produkState.fetching && (
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <div style={{ width: "40%" }}>
              <Skeleton
                duration={1.5}
                baseColor="#3f3f3f"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: 1 / 1,
                  borderRadius: 10,
                }}
              />
            </div>
            <div style={{ width: "60%", paddingLeft: 25 }}>
              <Skeleton
                duration={1.5}
                baseColor="#3f3f3f"
                style={{
                  width: "100%",
                  height: 100,
                  aspectRatio: 1 / 1,
                  borderRadius: 10,
                }}
              />
              <Skeleton
                count={7}
                duration={1.5}
                baseColor="#3f3f3f"
                style={{
                  width: "100%",
                  height: 50,
                  aspectRatio: 1 / 1,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </div>
          </div>
        )}
        {produkState.detailProduk && !produkState.fetching && (
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
                {produkState.fetching2 ? (
                  <Button
                    loading
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
                    Loading
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (member_credent) {
                        dispatch(
                          addToCart({
                            user_id: member_credent.id,
                            produk_id: produkState.detailProduk.id,
                            quantity: qty,
                            transaction_id: 0,
                          })
                        );
                      } else {
                        message.error(
                          "silahkan login untuk melakukan pembelian"
                        );
                      }
                    }}
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
                )}
                <Button
                  onClick={() => {
                    if (member_credent) {
                      setIsModalOpen(true);
                    } else {
                      message.error("silahkan login untuk melakukan pembelian");
                    }
                  }}
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
