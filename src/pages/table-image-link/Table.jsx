import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table, Upload } from "antd";
import { useNavigate } from "react-router";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert";
const { Column } = Table;

const TableImage = () => {
  const navigate = useNavigate();
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_APP}/link/`)
      .then((data) => setImage(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (record) => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    setIsModalOpen(false);
  };

  const handleDelete = (record) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL_APP}/link/${record.id}`)
      .then((data) => {
        Swal({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleClickEdit = (record) => {
    navigate(`/admin/image/${record.id}`);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("link", values.user.website);
    formData.append("file", values.upload[0].originFileObj);
    axios
      .post(`${process.env.REACT_APP_API_URL_APP}/link`, formData)
      .then((data) => {
        if (data.data) {
          Swal({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsModalOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button
        className='m-3'
        type='primary'
        onClick={() => {
          handleClick();
        }}
      >
        CREATE
      </Button>
      <Table dataSource={image}>
        <Column title='Image' dataIndex='image' key='image' />
        <Column title='Link' dataIndex='link' key='link' />

        <Column
          title='Action'
          key='action'
          render={(_, record) => (
            <Space size='middle'>
              <Button
                type='primary'
                onClick={() => {
                  handleClickEdit(record);
                }}
              >
                EDIT
              </Button>
              <Button
                type='primary'
                danger
                onClick={() => {
                  handleDelete(record);
                }}
              >
                DELETE
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title='Create Image'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item name={["user", "website"]} label='Website'>
            <Input />
          </Form.Item>
          <Form.Item
            name='upload'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={normFile}
          >
            <Upload name='logo' action='/upload.do' listType='picture'>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Space>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button htmlType='reset' onClick={handleCancel}>
                reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default TableImage;
