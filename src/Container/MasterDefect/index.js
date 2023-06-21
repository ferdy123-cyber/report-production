import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMasterDefect,
  deleteMasterDefect,
  getMasterDefect,
} from "../../Reducer/Action";

const MasterDefect = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reducer);
  const [param, setparam] = useState({
    sortby: "created",
    sorting: "DESC",
    limit: 15,
    offset: 0,
  });
  useEffect(() => {
    dispatch(getMasterDefect(param));
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
      title: "Nama Defect",
      dataIndex: "nama_defect",
      key: "nama_defect",
    },
    {
      title: "Kode Defect",
      dataIndex: "kode_defect",
      key: "kode_defect",
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
            onConfirm={() => dispatch(deleteMasterDefect(data.m_defect_id))}
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
    dispatch(createMasterDefect(value));
    setIsModalOpen(false);
  };
  // console.log(String(Date.now()));
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
              label="Nama Defect"
              name="nama_defect"
              rules={[
                { required: true, message: "Nama defect tidak boleh kosong!" },
              ]}
            >
              <Input />
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
          <Typography.Title level={5}>List Defect</Typography.Title>
        </Col>
        {/* <Col span={12} style={{ textAlign: "end" }}>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Tambah Defect
          </Button>
        </Col> */}
      </Row>
      <Table
        loading={state.fetchingGet}
        style={{ marginTop: 20 }}
        dataSource={state.mDefect && state.mDefect.data}
        columns={columns}
        pagination={{
          total: state.mDefect && state.mDefect.total,
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

export default MasterDefect;
