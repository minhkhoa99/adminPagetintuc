import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Space, Table, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert";
import { Button as ButtonReact,Modal as ModalReact } from "react-bootstrap";
const { Column } = Table;

const ImageTable = () => {
 
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      .get(`${process.env.REACT_APP_API_URL_APP}/upload-image-slide/`)
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
      .delete(`${process.env.REACT_APP_API_URL_APP}/upload-image-slide/${record.id}`)
      .then((data) => {
        window.location.reload();
        return data
      })
      .catch((err) => console.log(err));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    const formData = new FormData();
    const file = values.upload[0]?.originFileObj;
    formData.append("file", file);
    axios
      .post(
        `${process.env.REACT_APP_API_URL_APP}/upload-image-slide/`,
        formData
      )
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
          window.location.reload();
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
        <Column title='Title' dataIndex='title' key='title' />
        <Column title='Link' dataIndex='link' key='link' />

        <Column
          title='Action'
          key='action'
          render={(_, record) => (
            <Space size='middle'>
              <Button
                type='primary'
                danger
                onClick={handleShow}
              >
                DELETE
              </Button>
              <ModalReact show={show} onHide={handleClose}>
                      <ModalReact.Header closeButton>
                        <ModalReact.Title>Xóa hình ảnh</ModalReact.Title>
                      </ModalReact.Header>
                      <ModalReact.Body>
                        Bạn có chắc chắn muốn xóa ?
                      </ModalReact.Body>
                      <ModalReact.Footer>
                        <ButtonReact variant="secondary" onClick={handleClose}>
                          Đóng
                        </ButtonReact>
                        <ButtonReact
                          variant="primary"
                          onClick={() => handleDelete(record)}
                        >
                          Xác nhận
                        </ButtonReact>
                      </ModalReact.Footer>
                    </ModalReact>
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
export default ImageTable;
