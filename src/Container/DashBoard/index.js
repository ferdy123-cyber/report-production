import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, Popconfirm, Typography } from "antd";
import React, { useState } from "react";
import MasterBarang from "../MasterBarang";
import MasterDefect from "../MasterDefect";
import ReportNg from "../ReportNg";
import ReportOk from "../ReportOk";
import ReportExcel from "../ReportExcel";
// import { useSelector } from "react-redux";
import "./index.css";

const { Header, Sider, Content } = Layout;

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("2");

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{ textAlign: "center", marginTop: 20, marginBottom: 15 }}
          className="logo"
        >
          {/* <Image src={logo} width={50} height={50} alt="" preview={false} /> */}
          <Typography.Title
            style={{ color: "white", marginTop: 10, marginBottom: 10 }}
            level={5}
          >
            ReportProduction PT Bobaek Jaya Indonesia
          </Typography.Title>
        </div>
        <Menu
          onClick={(val) => setKey(val.key)}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[key]}
          items={[
            {
              key: "2",
              icon: <ProjectOutlined />,
              label: "List Barang",
            },
            {
              key: "3",
              icon: <ProjectOutlined />,
              label: "List Defect",
            },
            {
              key: "4",
              icon: <ProjectOutlined />,
              label: "Report Ok",
            },
            {
              key: "5",
              icon: <ProjectOutlined />,
              label: "Report Ng",
            },
            {
              key: "6",
              icon: <ProjectOutlined />,
              label: "Report Excel",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Popconfirm
            title="Kamu yakin ingin logout?"
            onConfirm={() => {
              localStorage.removeItem("user_credent");
              message.success("Berhasil logout");
              window.location.reload(false);
            }}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              style={{ marginLeft: 20 }}
              size="small"
              type="primary"
            >
              Logout
            </Button>
          </Popconfirm>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          {key === "2" && <MasterBarang />}
          {key === "3" && <MasterDefect />}
          {key === "4" && <ReportOk />}
          {key === "5" && <ReportNg />}
          {key === "6" && <ReportExcel />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
