import { Typography } from "antd";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";
import { getHistory } from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";

const QrScan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(getHistory({ id: id }));
  }, [id]);
  // console.log(state.history);
  // useEffect(() => {
  //   state.history.length && console.log(state.history[0]);
  //   if (state.history.length) {
  //     if (
  //       state.history[0].metode_pembayaran === "Bayar Ditempat" ||
  //       state.history[0].status_transaksi === "Berhasil"
  //     ) {
  //       navigate("/");
  //     }
  //   }
  // }, [state.history]);
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
          textAlign: "center",
        }}
      >
        <Typography.Title
          style={{ color: color.blue, marginBottom: 25 }}
          level={4}
        >
          Nomor Pembayaran
        </Typography.Title>
        {/* <div
          style={{
            padding: 20,
            backgroundColor: color.white,
            width: "fit-content",
            margin: "auto",
          }}
        >
          <QRCode value={id} width={200} height={200} />
        </div> */}
        <Typography.Title
          level={4}
          style={{ color: color.white, marginTop: 20 }}
        >
          {state.history &&
            state.history.length &&
            state.history[0].nomor_transaksi}
        </Typography.Title>

        <Typography.Title
          level={4}
          style={{ color: color.white, marginTop: 20 }}
        >
          {state.history &&
            state.history.length &&
            "Rp" + SeparatorRibuan(state.history[0].total_price)}
        </Typography.Title>
      </div>
    </>
  );
};
export default QrScan;
