import {
  Button,
  Col,
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
  createProdOk,
  deleteProdOk,
  getMasterBarang,
  getProdOk,
} from "../../Reducer/Action";

const ReportOk = () => {
  const user_credent = JSON.parse(localStorage.getItem("user_credent"));
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reducer);
  const [param, setparam] = useState({
    sortby: "tanggal",
    sorting: "DESC",
    limit: 15,
    offset: 0,
  });
  useEffect(() => {
    dispatch(getProdOk(param));
    dispatch(
      getMasterBarang({
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
      title: "Man Power",
      dataIndex: "man_power",
      key: "man_power",
      align: "center",
    },
    {
      title: "Ok Quantity",
      dataIndex: "ok_qty",
      key: "ok_qty",
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
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
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
              dispatch(deleteProdOk(data.report_production_ok_id))
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
    // const data = { ...value, man_power: user_credent.username };
    // dispatch(createProdOk(data));
    dispatch(createProdOk(value));
    setIsModalOpen(false);
    // console.log(data);
  };
  // console.log(state.mBarang);
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
              label="Man Power"
              name="man_power"
              rules={[
                { required: true, message: "Man power tidak boleh kosong!" },
              ]}
            >
              <Input style={{ width: "100%" }} />
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
              label="Ok Quantity"
              name="ok_qty"
              rules={[
                { required: true, message: "Ok quantity tidak boleh kosong!" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Shift"
              name="shift"
              rules={[
                { required: true, message: "Shift number tidak boleh kosong!" },
              ]}
            >
              <Select>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
              </Select>
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
        <Col span={12}>
          <Typography.Title level={5}>Report Ok</Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: "end" }}>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Input Report Ok
          </Button>
        </Col>
      </Row>
      <Table
        loading={state.fetchingGet}
        style={{ marginTop: 20 }}
        dataSource={state.reportOk && state.reportOk.data}
        columns={columns}
        pagination={{
          total: state.reportOk && state.reportOk.total,
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

export default ReportOk;
