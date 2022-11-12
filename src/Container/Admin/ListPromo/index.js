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
  BASE_URL,
  getListProdukPromo,
  changeListPromo,
} from "../../../Reducer/Action";

const ListPromo = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.adminReducer);
  const [param, setparam] = useState({ limit: 10, offset: 0 });
  const [param2, setparam2] = useState({ limit: 5, offset: 0 });
  useEffect(() => {
    dispatch(getListProdukPromo(param));
  }, [param]);
  useEffect(() => {
    dispatch(getListProduk(param2));
  }, [param2]);
  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      // width: 250,
      align: "center",
    },
    {
      title: "Gambar",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (value, data) => (
        <Image
          src={BASE_URL + value}
          style={{ width: 100, height: 100, objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Harga Normal",
      dataIndex: "price",
      key: "price",
      align: "center",
      // render: (value) => <p>{Number(value) + 6}</p>,
    },
    {
      title: "Harga Promo",
      dataIndex: "price_promo",
      key: "price_promo",
      align: "center",
      // render: (value) => <p>{Number(value) + 6}</p>,
    },
    {
      title: "Stok",
      dataIndex: "stok",
      key: "stok",
      align: "center",
      // render: (value) => <p>{Number(value) + 6}</p>,
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      width: 150,
      align: "center",
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
            onConfirm={() =>
              dispatch(
                changeListPromo({
                  id: data.id,
                  param: param,
                  data: { promo: "N" },
                })
              )
            }
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
  const onFinish2 = (value) => {
    value.id = data.id;
    // dispatch(editListProduk(value));
    dispatch(
      changeListPromo({
        id: data.id,
        param: param,
        data: { price_promo: value.price_promo },
      })
    );
    setIsModalOpen2(false);
  };
  const [data, setdata] = useState(null);
  return (
    <div>
      <Row>
        <Modal
          style={{ top: 20 }}
          width={1000}
          footer={false}
          title="Tambah Promo"
          open={isModalOpen}
          onOk={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        >
          <Input.Search
            onPressEnter={(val) =>
              setparam2({ ...param2, name: val.target.value, offset: 0 })
            }
            style={{ marginRight: 30 }}
            placeholder="Cari nama produk..."
          />
          <Table
            scroll={{
              x: 800,
              y: 350,
            }}
            loading={userState.fetching}
            style={{ marginTop: 20 }}
            dataSource={userState.listProduk && userState.listProduk.data}
            columns={[
              {
                title: "Nama",
                dataIndex: "name",
                key: "name",
                align: "center",
                render: (value) => (
                  <Typography.Paragraph style={{ fontSize: 13 }}>
                    {value}
                  </Typography.Paragraph>
                ),
              },
              {
                title: "Harga Normal",
                dataIndex: "price",
                key: "price",
                align: "center",
              },
              {
                title: "Gambar",
                dataIndex: "image",
                key: "image",
                align: "center",
                render: (value, data) => (
                  <Image
                    src={BASE_URL + value}
                    style={{ width: 50, height: 50, objectFit: "contain" }}
                  />
                ),
              },
              {
                title: "Stok",
                dataIndex: "stok",
                key: "stok",
                align: "center",
              },
              {
                title: "Aksi",
                dataIndex: "promo",
                key: "promo",
                width: 150,
                align: "center",
                fixed: "right",
                render: (value, data) => (
                  <div>
                    {value === "N" ? (
                      <Button
                        onClick={() => {
                          // setdata(data);
                          dispatch(
                            changeListPromo({
                              id: data.id,
                              param: param,
                              data: { promo: "Y" },
                            })
                          );
                          setIsModalOpen(false);
                        }}
                        size="small"
                        type="primary"
                      >
                        Ubah ke promo
                      </Button>
                    ) : (
                      <Button
                        style={{ cursor: "not-allowed" }}
                        size="small"
                        type="ghost"
                        danger
                      >
                        Sedang promo
                      </Button>
                    )}
                  </div>
                ),
              },
            ]}
            pagination={{
              total: userState.listProduk && userState.listProduk.total,
              pageSize: param2.limit,
            }}
            onChange={(page) => {
              setparam2({
                ...param2,
                offset: param2.limit * (page.current - 1),
              });
            }}
            rowKey={(row) => row.id}
          />
        </Modal>
        <Modal
          footer={false}
          title="Edit Promo"
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
            disabled
          />
          <Typography.Text>Harga Normal : </Typography.Text>
          <InputNumber
            style={{ width: "100%" }}
            onChange={(val) => setdata({ ...data, price: val })}
            value={data && data.price}
            placeholder=""
            disabled
          />
          <Typography.Text>Harga Promo : </Typography.Text>
          <InputNumber
            style={{ width: "100%" }}
            onChange={(val) => setdata({ ...data, price_promo: val })}
            value={data && data.price_promo}
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
          <Typography.Title level={5}>List Promo</Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: "end", display: "flex" }}>
          <Input.Search
            onPressEnter={(val) =>
              setparam({ ...param, name: val.target.value, offset: 0 })
            }
            style={{ marginRight: 30 }}
            placeholder="Cari nama produk..."
          />
          <Button
            onClick={() => {
              dispatch(getListProduk(param2));
              setIsModalOpen(true);
            }}
            type="primary"
          >
            Tambah Promo
          </Button>
        </Col>
      </Row>
      <Table
        loading={userState.fetching}
        style={{ marginTop: 20 }}
        dataSource={userState.listProdukPromo && userState.listProdukPromo.data}
        columns={columns}
        pagination={{
          total: userState.listProdukPromo && userState.listProdukPromo.total,
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

export default ListPromo;
