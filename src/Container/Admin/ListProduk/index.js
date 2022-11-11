import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Table,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListProduk,
  addListProduk,
  deleteListProduk,
  BASE_URL,
  editListProduk,
} from "../../../Reducer/Action";
import Resizer from "react-image-file-resizer";

const ListProduk = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(getListProduk());
  }, []);
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      // width: 250,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      // render: (value) => <p>{Number(value) + 6}</p>,
    },
    {
      title: "Gambar Produk",
      dataIndex: "image",
      key: "image",
      render: (value, data) => (
        <Image
          src={BASE_URL + value}
          style={{ width: 100, height: 100, objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      render: (value) => (
        <Typography.Paragraph ellipsis={{ rows: 5, expandable: false }}>
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      width: 150,
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
            onConfirm={() => dispatch(deleteListProduk(data.id))}
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
  const onFinish = async (value) => {
    // console.log(value.image.file);
    // const compressimg = await resizeFile(value.image.file);
    // value.image = compressimg;
    dispatch(addListProduk(value));
    // console.log(value.image);
    setIsModalOpen(false);
  };
  const onFinish2 = (value) => {
    value.id = data.id;
    dispatch(editListProduk(value));
    // console.log(value);
    setIsModalOpen2(false);
  };
  const [data, setdata] = useState(null);
  return (
    <div>
      <Row>
        <Modal
          footer={false}
          title="Tambah Produk"
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
              name="name"
              rules={[{ required: true, message: "Nama tidak boleh kosong!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Harga"
              name="price"
              rules={[{ required: true, message: "Harga tidak boleh kosong!" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Deskripsi"
              name="description"
              rules={[
                { required: true, message: "Deskripsi tidak boleh kosong!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Gambar Produk"
              name="image"
              rules={[
                { required: true, message: "Gambar tidak boleh kosong!" },
              ]}
            >
              <Upload
                style={{ margin: "auto", backgroundColor: "red" }}
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                // onChange={async (image) => {
                //   console.log(image.file);
                //   const imagecompress = await resizeFile(image.file);
                //   setImage(imagecompress);
                // }}
              >
                <div>
                  <p>Upload</p>
                </div>
              </Upload>
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
            value={data && data.name}
            onChange={(val) => setdata({ ...data, name: val.target.value })}
            placeholder=""
            style={{ marginBottom: 15 }}
          />
          <Typography.Text>Harga : </Typography.Text>
          <InputNumber
            style={{ width: "100%" }}
            onChange={(val) => setdata({ ...data, price: val })}
            value={data && data.price}
            placeholder=""
          />
          <Typography.Text>Deskripsi : </Typography.Text>
          <Input.TextArea
            rows={5}
            value={data && data.description}
            onChange={(val) =>
              setdata({ ...data, description: val.target.value })
            }
            placeholder=""
            style={{ marginBottom: 15 }}
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
          <Typography.Title level={5}>List Produk</Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: "end" }}>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Tambah Produk
          </Button>
        </Col>
      </Row>
      <Table
        loading={userState.fetching}
        style={{ marginTop: 20 }}
        dataSource={userState.listProduk}
        columns={columns}
        pagination={false}
        rowKey={(row) => row.id}
      />
    </div>
  );
};

export default ListProduk;
