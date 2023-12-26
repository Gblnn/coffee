import React, { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Space, Table } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
 
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}




const App: React.FC = () => {

  const [posts, setPosts] = useState<any[]>([])
  useEffect(()=>{
    fetch("https://6586a271468ef171392e80df.mockapi.io/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                console.log(data)
            })
    },[])


  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title:"Content",dataIndex: 'name', key: 'name', render:()=><><p>Merry Christmas</p></> },
      {
        key: 'state',
        render: () => <></>,
      },
      {  dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        
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
            date: '',
            name: '',
            upgradeNum: '',
          });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Posts', dataIndex: 'name', key: 'name' }

  ];

  const data: DataType[] = [];
  // for (let i = 0; i < 12; ++i) {
  //   data.push({
  //     key: i.toString(),
  //     name: '',
  //     platform: 'iOS',
  //     version: '10.3.4.5654',
  //     upgradeNum: 500,
  //     creator: 'Jack',
  //     createdAt: '2014-12-24 23:12:00',
  //   });
  // }
  posts.map((posts:any)=>{
    data.push({
          key: posts.id,
          name: posts.content,
        });    
    
       
})

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
