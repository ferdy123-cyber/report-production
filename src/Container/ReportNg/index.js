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
} from "../../Reducer/Action";

const ReportNg = () => {
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
    dispatch(getProdNg(param));
    dispatch(
      getMasterBarang({
        sortby: "created",
        sorting: "DESC",
        limit: 1000,
        offset: 0,
      })
    );
    dispatch(
      getMasterDefect({
        sortby: "created",
        sorting: "DESC",
        limit: 1000,
        offset: 0,
      })
    );
  }, [param, state.refreshdata]);
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
      title: "Box",
      dataIndex: "box",
      key: "box",
      align: "center",
    },
    {
      title: "Lot",
      dataIndex: "lot",
      key: "lot",
      align: "center",
    },
    {
      title: "Ng Quantity",
      dataIndex: "ng_qty",
      key: "ng_qty",
      align: "center",
    },
    {
      title: "Kode Defect",
      dataIndex: "kode_defect",
      key: "kode_defect",
      align: "center",
    },
    {
      title: "Nama Defect",
      dataIndex: "nama_defect",
      key: "nama_defect",
      align: "center",
    },
    {
      title: "Part Name",
      dataIndex: "part_name",
      key: "part_name",
      align: "center",
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
      title: "Tanggal Input",
      dataIndex: "tanggal",
      key: "tanggal",
      render: (value, data) => (
        <Typography.Text>
          {moment(data.tanggal).format("DD-MM-YYYY")}
        </Typography.Text>
      ),
      align: "center",
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      width: 200,
      align: "center",
      render: (value, data) => (
        <div>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() =>
              dispatch(deleteProdNg(data.report_production_ng_id))
            }
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              style={{ marginLeft: 10 }}
              size="small"
              type="primary"
            >
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (value) => {
    setparam({ ...param, offset: 0, tanggal: moment().format("YYYY-MM-DD") });
    dispatch(createProdNg(value));
    setIsModalOpen(false);
    // console.log(data);
  };
  console.log(state.reportNg);
  return (
    <div>
      <Row>
        <Modal
          footer={false}
          title="Tambah Defect"
          open={isModalOpen}
          onOk={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Box"
              name="box"
              rules={[{ required: true, message: "Box tidak boleh kosong!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Lot"
              name="lot"
              rules={[{ required: true, message: "lot tidak boleh kosong!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Part Nomor"
              name="m_barang_id"
              rules={[
                {
                  required: true,
                  message: "Part Nomor Barang tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {state.mBarang &&
                  state.mBarang.data.map((e) => {
                    return (
                      <Select.Option value={e.m_barang_id}>
                        {e.part_number} ({e.part_name})
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Kode Defect"
              name="m_defect_id"
              rules={[
                {
                  required: true,
                  message: "Kode defect Barang tidak boleh kosong!",
                },
              ]}
            >
              <Select>
                {state.mDefect &&
                  state.mDefect.data.map((e) => {
                    return (
                      <Select.Option value={e.m_defect_id}>
                        {e.kode_defect} ({e.nama_defect})
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ng Quantity"
              name="ng_qty"
              rules={[
                { required: true, message: "Ok quantity tidak boleh kosong!" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item style={{ textAlign: "end" }} wrapperCol={{ span: 24 }}>
              {state.fetchingAdd ? (
                <Button type="primary" loading>
                  Loading
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>
        <Col style={{ display: "flex", alignItems: "center" }} span={24}>
          <Typography.Title style={{ flex: 1 }} level={5}>
            Report Ng
          </Typography.Title>
          <DatePicker
            // defaultValue={moment(moment(), "YYYY/MM")}
            value={moment(param.tanggal, "YYYY/MM")}
            onChange={(date, datestring) => {
              console.log(datestring);
              setparam({
                ...param,
                tanggal: datestring,
              });
            }}
            style={{ marginRight: 10 }}
            picker="month"
          />
          {/* <Button
            style={{
              marginRight: 10,
              backgroundColor: "#389e0d",
              borderColor: "#389e0d",
            }}
            onClick={() => setIsModalOpen(true)}
            type="primary"
          >
            Export Excel
          </Button> */}
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Input Report Ng
          </Button>
        </Col>
        {/* <Col span={14} style={{ textAlign: "end" }}>
          
        </Col> */}
      </Row>
      <Table
        loading={state.fetchingGet}
        style={{ marginTop: 20 }}
        dataSource={state.reportNg && state.reportNg.data}
        columns={columns}
        pagination={{
          total: state.reportNg && state.reportNg.total,
          pageSize: param.limit,
        }}
        onChange={(page) => {
          setparam({ ...param, offset: param.limit * (page.current - 1) });
        }}
        rowKey={(row) => row.m_defect_id}
      />
    </div>
  );
};

export default ReportNg;
