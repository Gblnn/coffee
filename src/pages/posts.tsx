import React, { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { ConfigProvider, Empty, Space, Table } from 'antd';

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
  const user_data = window.name

  useEffect(()=>{
    fetch("https://6586a271468ef171392e80df.mockapi.io/posts?author="+user_data)
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                console.log(data)
            })
    },[])


  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title:"Content",dataIndex: 'name', key: 'name', render:()=><><p></p></> },
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
  posts.map((posts:any)=>{
    data.push({
          key: posts.id,
          name: posts.content,
        });    
    
       
})

  return (
    <>
    <h3 style={{marginBottom:"1rem"}}>Posts</h3>
    <ConfigProvider renderEmpty={()=><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No posts"/>}>
      {String(posts.length)=="9"?null:
      <Table
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
    />
      }
    
    </ConfigProvider>
      
    </>
  );
};

export default App;
