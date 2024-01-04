import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
const data = [
    {

        UserName: 32,
        password: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {

        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const TableUser = () => (
    <Table dataSource={data}>

        <Column title="User Name" dataIndex="UserName" key="email" />
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
);
export default TableUser;