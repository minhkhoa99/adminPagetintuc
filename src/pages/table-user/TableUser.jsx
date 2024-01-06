import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import axios from "axios"
const { Column, ColumnGroup } = Table;



const TableUser = () => {
    const [user, setUser] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/user/")
        .then((data) => setUser(data.data.data))
        .catch((err) => console.log(err))
    }, [])
    console.log(user);
    return(
          <Table dataSource={user} >

        <Column title="User Name" dataIndex="username" key="username" />
        <Column title="PassWord" dataIndex="password" key="password" />

        <Column
            title="Action"
            key="action"
            render={(_, record) => (
                <Space size="middle">
                    <Button type="primary" >
                        EDIT
                    </Button>
                    <Button type="primary" danger >
                        DELETE
                    </Button>

                </Space>
            )}
        />
    </Table>  
    )
 
}
export default TableUser;