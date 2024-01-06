import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Column } = Table;

const TableUser = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/")
      .then((data) => setUser(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (record) => {
    navigate(`/admin/user/${record.id}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = (id) => {
    axios.delete(`http://localhost:8000/user/${id}`)
    .then((data) => alert("Delete Successs"))
    .catch((err) => console.log(err))
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (record) => {
    handleOk(record.id)
   
  }
  return (
    <div>
        <Table dataSource={user}>
      <Column title="User Name" dataIndex="username" key="username" />
      <Column title="PassWord" dataIndex="password" key="password" />

      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                handleClick(record);
              }}
            >
              EDIT
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalOpen(true);
                handleDelete(record)
              }}
            >
              DELETE
            </Button>
          </Space>
        )}
      />
    </Table> 
    <Modal
        title="DELETE"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có muốn xóa người dùng này không ?</p>
      </Modal>
    </div>
   
  );
};
export default TableUser;
