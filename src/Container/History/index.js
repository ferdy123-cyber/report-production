import { Button, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { color } from "../../color";
import NavBar from "../../Component/NavBar";
import { getHistory } from "../../Reducer/Action";
import SeparatorRibuan from "../../SeparatorRibuan";

const History = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(getHistory({ user_id: id }));
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
          // textAlign: "center",
        }}
      >
        {state.history.map((e) => {
          return (
            <div
              key={e.id}
              style={{
                width: "100%",
                backgroundColor: "#333",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 8px 0px",
                overflow: "hidden",
                padding: 15,
                marginBottom: 15,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography.Title level={5} style={{ color: color.white }}>
                  Nomor Transaksi {e.nomor_transaksi}
                </Typography.Title>
                <Typography.Text level={5} style={{ color: color.white }}>
                  {e.tanggal}
                </Typography.Text>
              </div>
              <Typography.Text style={{ color: color.white }}>
                {e.alamat_tujuan}
              </Typography.Text>
              <Typography.Title level={5} style={{ color: color.blue }}>
                Rp{SeparatorRibuan(e.total_price)}
              </Typography.Title>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "end",
                }}
              >
                {e.status_transaksi == "Menunggu Pembayaran" ? (
                  <>
                    <Typography.Text
                      level={5}
                      style={{ color: "#faad14", marginRight: 15 }}
                    >
                      {e.status_transaksi}
                    </Typography.Text>
                    <Button
                      onClick={() => navigate(`/pembayaran/${e.id}`)}
                      size="small"
                      type="primary"
                    >
                      Lihat Nomor Pembayaran
                    </Button>
                  </>
                ) : (
                  <Typography.Text level={5} style={{ color: "#a0d911" }}>
                    {e.status_transaksi}
                  </Typography.Text>
                )}
              </div>
              <Typography.Text style={{ color: color.white }}>
                {e.metode_pembayaran}
              </Typography.Text>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default History;
