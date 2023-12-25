import React from 'react';
import type { TableColumnsType } from 'antd';
import { Badge, Space, Table } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}


const App: React.FC = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    const data = [];

    data.push({
            key: toString(),
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
          });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Posts', dataIndex: 'name', key: 'name' },
    
    
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },

  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Content',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />
      
    </>
  );
};

export default App;
