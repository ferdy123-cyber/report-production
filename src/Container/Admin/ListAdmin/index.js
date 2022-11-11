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
  getListAdmin,
  deleteListAdmin,
  addListAdmin,
  editListAdmin,
} from "../../../Reducer/Action";
import moment from "moment";

const ListAdmin = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(getListAdmin());
  }, []);
  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      render: (value, data) => (
        <div>
          <Button
            onClick={() => {
              setdata(data);
              setIsModalOpen2(true);
            }}
            style={{
              backgroundColor: "#d4b106",
              borderColor: "#d4b106",
            }}
            size="small"
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => dispatch(deleteListAdmin(data.id))}
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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const onFinish = (value) => {
    value.is_active = "1";
    value.role_id = 1;
    value.tanggal_input = moment().format("YYYY-MM-DD");
    dispatch(addListAdmin(value));
    setIsModalOpen(false);
  };
  const onFinish2 = (value) => {
    value.id = data.id;
    dispatch(editListAdmin(value));
    setIsModalOpen2(false);
  };
  const [data, setdata] = useState(null);
  return (
    <div>
      <Row>
        <Modal
          footer={false}
          title="Tambah Admin"
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
              label="Nama"
              name="nama"
              rules={[{ required: true, message: "Nama tidak boleh kosong!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email tidak boleh kosong!" },
                { type: "email", message: "Format email tidak valid" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Alamat"
              name="alamat"
              rules={[
                { required: true, message: "Alamat tidak boleh kosong!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ textAlign: "end" }} wrapperCol={{ span: 24 }}>
              {userState.fetching2 ? (
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
        <Modal
          footer={false}
          title="Edit Admin"
          open={isModalOpen2}
          onOk={() => {
            setdata(null);
            setIsModalOpen2(false);
          }}
          onCancel={() => {
            setdata(null);
            setIsModalOpen2(false);
          }}
        >
          <Typography.Text>Nama : </Typography.Text>
          <Input
            value={data && data.nama}
            onChange={(val) => setdata({ ...data, nama: val.target.value })}
            placeholder=""
            style={{ marginBottom: 15 }}
          />
          <Typography.Text>Alamat : </Typography.Text>
          <Input
            onChange={(val) => setdata({ ...data, alamat: val.target.value })}
            value={data && data.alamat}
            placeholder=""
          />
          <Button
            onClick={() => onFinish2(data)}
            type="primary"
            style={{ marginTop: 20 }}
          >
            Simpan
          </Button>
        </Modal>
        <Col span={12}>
          <Typography.Title level={5}>List Admin</Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: "end" }}>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Tambah Admin
          </Button>
        </Col>
      </Row>
      <Table
        loading={userState.fetching}
        style={{ marginTop: 20 }}
        dataSource={userState.listAdmin}
        columns={columns}
        pagination={false}
        rowKey={(row) => row.id}
      />
    </div>
  );
};

export default ListAdmin;
