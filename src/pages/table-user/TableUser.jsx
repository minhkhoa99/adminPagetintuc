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
  }, [user]);
  const newUser = user.filter((e) => e.username !== "admin")

  const handleClick = (record) => {
    navigate(`/admin/user/${record.id}`);
  };

  const handleDelete = (record) => {
    axios.delete(`http://localhost:8000/user/${record.id}`)
    .then((data) => console.log(data.data))
    .catch((err) => console.log(err))
   
  }
  return (
    <div>
        <Table dataSource={newUser}>
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
                handleDelete(record)
              }}
            >
              DELETE
            </Button>
          </Space>
        )}
      />
    </Table> 
    </div>
   
  );
};
export default TableUser;
