import '../styles/colorscheme.css'
import Post from '../components/post';
import {post} from '../posts.ts'
import { Button, ConfigProvider, Drawer, FloatButton, Select, message } from 'antd';
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Home(){

    
    const [loading, setLoading] = useState(false)
    const author = "gbln___"
    const profile = "/coffee.png"
    const [content, setContent] = useState("")
    let date = new Date().toLocaleDateString()
    const [colorscheme, setColor] = useState("")
    const [posts, setPosts] = useState<any[]>([])
    useEffect(()=>{
        fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(data => setPosts(data))
    })

    const onPost=()=>{
        let obj = {profile, author, content, colorscheme, date}
        setLoading(true)
        setColor("white")
        setTimeout(() => {
            message.success("Posted Sucessfully")
            fetch("http://localhost:3000/posts",
            {
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(obj)
            }
            )
            setLoading(false)
            onClose()
            
        }, 2000);
    }

    

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };

    //   const handleChange = (value: string) => {
    //     console.log(`selected ${value}`);
    //   };
    
      
      

    return(
        <>
        
            
            <div className='page_container'>
                <div >
                    <InfiniteScroll
                    style={{padding:"1rem"}}
                    className='procard_container'
                    dataLength={1}
                    next={()=>{}}
                    hasMore={true}
                    loader={<div className='loader'><LoadingOutlined style={{fontSize:"2rem"}}/></div>}
                    endMessage={
                        <div className='loader'>
                            <p style={{ textAlign: 'center' }}>
                            <b>You're all caught up</b>
                        </p>
                        </div>
                        
                      }
                      
                    
                    >
                    {
                    post.map((item)=>(
                    
                    <Post key={item.id} admin={item.admin} author={item.author} profile={item.profile} date={item.date} content={item.content} likes={item.likes} comments={item.comments} bookmarks={item.bookmarks} colorscheme={item.colorscheme}
                    />))
                    }
                    {
                    posts.map((posts)=>(
                        <Post key={posts.id} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" />
                    ))
                    }
                    </InfiniteScroll>
                    
                </div>
            </div>
            
            
            <div className='empty'></div>
            
        

            <FloatButton onClick={showDrawer} shape='square' tooltip={"Create a new Post"} icon={<PlusOutlined/>}/>
            <Drawer placement='bottom' size='default' title={"Create a post"} onClose={onClose} open={open}>
                <ConfigProvider
                theme={{
                    components: {
                      Input: {
                        hoverBorderColor:"black",
                        activeBorderColor:"#4a4a4a",
                        activeShadow:"#8a8a8a"
                      },
                    },
                  }}
                >
                <TextArea allowClear bordered={false} onChange={e=>setContent(e.target.value)} style={{fontFamily:"Supreme", fontSize:"1rem", resize: 'none'}} rows={8} maxLength={200} placeholder='Write your thoughts here'/>
                </ConfigProvider>
                
                <div className='empty'></div>
                <ConfigProvider
                    theme={{
                        token: {
                        colorPrimary:"black"
                        }
                    }}
                    >
                    <Button style={{width:"6rem"}} type='primary' onClick={onPost} loading={loading}>Post</Button>
                    
                </ConfigProvider>
                <Select
                        defaultValue="white"
                        style={{ width: 120, marginLeft:"1rem" }}
                        onChange={setColor}
                        options={[
                            { value: 'white', label: 'White' },
                            { value: 'black', label: 'Black' },
                            { value: 'sad', label: 'Sad' },
                            { value: 'royal', label: 'Royal' },
                        ]}
                    />
            </Drawer>
            
        
        {/* <Layout>
            <Header style={{color:"white"}}>COFFEE</Header>
            <Layout>
                <Sider>
                <Menu className="sidemenu"
                items={[
                    {
                        label:"Home",
                        key:"home"
                    },
                    {
                        label:"Likes",
                        key:"likes"
                    },
                    {
                        label:"Bookmarks",
                        key:"bookmarks"
                    },
                    {
                        label:"Posts",
                        key:"posts"
                    },
                    {
                        label:"Profile",
                        key:"profile",
                        children:[
                            {
                            label:"Current account",
                            key:"ca"
                            },
                            {
                                label:"Add account",
                                key:"aa"
                                },
                        ]
                    },
                ]} 
                />          
                </Sider>
                <Content>
                    <div className="Content">

                    </div>
                </Content>
            </Layout>
            <Footer>footer</Footer>
        </Layout> */}
        {/* <ProTable></ProTable> */}
        </>
    )
}