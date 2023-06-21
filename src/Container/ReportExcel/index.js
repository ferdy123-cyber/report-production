import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProdNg,
  deleteProdNg,
  getMasterBarang,
  getMasterDefect,
  getProdNg,
  getReportExcel,
  exportExcel,
  BASE_URL,
} from "../../Reducer/Action";

const ReportExcel = () => {
  const user_credent = JSON.parse(localStorage.getItem("user_credent"));
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reducer);
  const [param, setparam] = useState({
    sortby: "tanggal",
    sorting: "DESC",
    limit: 15,
    offset: 0,
    tanggal: moment().format("YYYY-MM-DD"),
  });
  useEffect(() => {
    dispatch(getReportExcel(param));
  }, [param]);
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (val, data, index) => (
        <Typography.Text>{index + 1 + param.offset}</Typography.Text>
      ),
    },
    {
      title: "Part Number",
      dataIndex: "part_no",
      key: "part_no",
      align: "center",
    },
    {
      title: "Part Name",
      dataIndex: "part_name",
      key: "part_name",
      align: "center",
    },
    {
      title: "Lot",
      dataIndex: "lot",
      key: "lot",
      align: "center",
    },
    {
      title: "Box Number",
      dataIndex: "box_no",
      key: "box_no",
      align: "center",
    },
    {
      title: "Ok Quantity",
      dataIndex: "ok_qty",
      key: "ok_qty",
      align: "center",
    },
    {
      title: "Ng Quantity",
      dataIndex: "ng_qty",
      key: "ng_qty",
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
    },
    {
      title: "Ratio",
      dataIndex: "rasio",
      key: "rasio",
      align: "center",
    },
    {
      title: "Black Dot",
      dataIndex: "black_dot",
      key: "black_dot",
      align: "center",
    },
    {
      title: "Broken",
      dataIndex: "broken",
      key: "broken",
      align: "center",
    },
    {
      title: "Contamination",
      dataIndex: "contamination",
      key: "contamination",
      align: "center",
    },
    {
      title: "Dirty",
      dataIndex: "dirty",
      key: "dirty",
      align: "center",
    },
    {
      title: "Flash",
      dataIndex: "flash",
      key: "flash",
      align: "center",
    },
    {
      title: "White Mark",
      dataIndex: "white_mark",
      key: "white_mark",
      align: "center",
    },
  ];
  return (
    <div>
      <Row>
        <Col style={{ display: "flex", alignItems: "center" }} span={24}>
          <Typography.Title style={{ flex: 1 }} level={5}>
            Report Excel
          </Typography.Title>
          <DatePicker
            value={moment(param.tanggal, "YYYY/MM")}
            onChange={(date, datestring) => {
              // console.log(datestring);
              setparam({
                ...param,
                tanggal: datestring,
              });
            }}
            style={{ marginRight: 10 }}
            picker="month"
          />
          <Button
            style={{
              marginRight: 10,
              backgroundColor: "#389e0d",
              borderColor: "#389e0d",
            }}
            onClick={() => {
              window.open(
                `${BASE_URL}/reportExcel/exportExcel?tanggal=${param.tanggal}`
              );
            }}
            type="primary"
          >
            Export Excel
          </Button>
        </Col>
      </Row>
      <Table
        loading={state.fetchingGet}
        style={{ marginTop: 20 }}
        dataSource={state.reportExcel && state.reportExcel.data}
        columns={columns}
        // pagination={{
        //   total: state.reportNg && state.reportNg.total,
        //   pageSize: param.limit,
        // }}
        // onChange={(page) => {
        //   setparam({ ...param, offset: param.limit * (page.current - 1) });
        // }}
        rowKey={(row) => row.m_defect_id}
      />
    </div>
  );
};

export default ReportExcel;
