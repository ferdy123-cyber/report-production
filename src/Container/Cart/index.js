import { Image, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";
import { BASE_URL, deleteListCart, getListCart } from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

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
    dispatch(getListCart(member_credent.id));
  }, [id]);

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
        {produkReducer.listCart && produkReducer.listCart.data && (
          <>
            <div style={{ width: "65%" }}>
              {produkReducer.listCart.data.map((e) => {
                return (
                  <div
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
                      <Typography.Text style={{ color: color.blue }}>
                        {e.quantity} x Rp{SeparatorRibuan(e.price)}
                      </Typography.Text>
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
            </div>
            <div></div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
