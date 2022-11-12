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
  deleteListProduk,
  BASE_URL,
  getListPoster,
  addListPoster,
  deleteListPoster,
} from "../../../Reducer/Action";
import ImgCrop from "antd-img-crop";

const ListPoster = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.adminReducer);
  const [param, setparam] = useState({ limit: 3, offset: 0 });
  useEffect(() => {
    dispatch(getListPoster(param));
  }, [param]);
  const columns = [
    {
      title: "Gambar Poster",
      dataIndex: "image",
      key: "image",
      render: (value, data) => (
        <Image
          src={BASE_URL + value}
          style={{ width: 300, height: 85, objectFit: "contain" }}
        />
      ),
      align: "center",
    },
    {
      title: "Tanggal Input",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      width: 150,
      align: "center",
      render: (value, data) => (
        <div>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() =>
              dispatch(deleteListPoster({ data: data.id, param: param }))
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
  const onFinish = async () => {
    dispatch(addListPoster({ image: image, param: param }));
    // setFileList([]);
    // setImage(null);
    setIsModalOpen(false);
  };
  const [image, setImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  return (
    <div>
      <Row>
        <Modal
          footer={false}
          title="Tambah Poster"
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
              label="Gambar Poster"
              name="image"
              rules={[
                {
                  required: fileList.length === 0,
                  message: "Gambar tidak boleh kosong!",
                },
              ]}
            >
              <ImgCrop quality={0.7} aspect={1200 / 338}>
                <Upload
                  style={{ margin: "auto", backgroundColor: "red" }}
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={(file) => {
                    setImage(file);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      setFileList(() => [{ url: reader.result }]);
                    };
                    return false;
                  }}
                  // onPreview={onPreview}
                  // onChange={onChange}
                  fileList={fileList}
                >
                  <div>
                    <p>Upload</p>
                  </div>
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.Item style={{ textAlign: "end" }} wrapperCol={{ span: 24 }}>
              {adminState.fetching2 ? (
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
          <Typography.Title level={5}>List Poster</Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: "end" }}>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Tambah Poster
          </Button>
        </Col>
      </Row>
      <Table
        loading={adminState.fetching}
        style={{ marginTop: 20 }}
        dataSource={adminState.listPoster && adminState.listPoster.data}
        columns={columns}
        pagination={{
          total: adminState.listPoster && adminState.listPoster.total,
          pageSize: param.limit,
        }}
        onChange={(page) => {
          setparam({ ...param, offset: param.limit * (page.current - 1) });
        }}
        rowKey={(row) => row.id}
      />
    </div>
  );
};

export default ListPoster;
