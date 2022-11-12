import {
  CheckSquareFilled,
  ClockCircleFilled,
  CloseSquareFilled,
  ProjectFilled,
  ProjectOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { color } from "../../../color";

const Dashboard = () => {
  return (
    <div style={{ padding: "0px 20px" }}>
      <Row justify={"space-between"}>
        <Col span={24} style={{ marginBottom: 20 }}>
          <Typography.Title level={5}>Dashboard</Typography.Title>
        </Col>
        <Col span={5}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              height: 120,
            }}
          >
            <div
              style={{
                width: "40%",
                height: "100%",
                backgroundColor: color.blue,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProjectFilled style={{ fontSize: 32, color: "white" }} />
            </div>
            <div style={{ height: "100%", width: "60%" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <Typography.Title level={1} style={{ color: color.black }}>
                    21
                  </Typography.Title>
                  <Typography.Text style={{ fontWeight: 500 }}>
                    Produk Terjual
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              height: 120,
            }}
          >
            <div
              style={{
                width: "40%",
                height: "100%",
                backgroundColor: "#faad14",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ClockCircleFilled style={{ fontSize: 32, color: "white" }} />
            </div>
            <div style={{ height: "100%", width: "60%" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <Typography.Title level={1} style={{ color: color.black }}>
                    21
                  </Typography.Title>
                  <Typography.Text style={{ fontWeight: 500 }}>
                    Menunggu Konfirmasi
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              height: 120,
            }}
          >
            <div
              style={{
                width: "40%",
                height: "100%",
                backgroundColor: "#a0d911",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckSquareFilled style={{ fontSize: 32, color: "white" }} />
            </div>
            <div style={{ height: "100%", width: "60%" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <Typography.Title level={1} style={{ color: color.black }}>
                    21
                  </Typography.Title>
                  <Typography.Text style={{ fontWeight: 500 }}>
                    Pesanan Selesai
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              height: 120,
            }}
          >
            <div
              style={{
                width: "40%",
                height: "100%",
                backgroundColor: "#f5222d",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseSquareFilled style={{ fontSize: 32, color: "white" }} />
            </div>
            <div style={{ height: "100%", width: "60%" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <Typography.Title level={1} style={{ color: color.black }}>
                    21
                  </Typography.Title>
                  <Typography.Text style={{ fontWeight: 500 }}>
                    Pesanan Gagal
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
