
import InfiniteScroll from "react-infinite-scroll-component";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import { useEffect, useState } from "react";
import Post from "../components/post";
import { Button, ConfigProvider, Drawer, FloatButton, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Empty } from "antd";



export default function Posts(){
    const [loading, setLoading] = useState(false)
    const author = "gbln___"
    const profile = "/coffee.png"
    let date = new Date().toLocaleDateString()
    const [colorscheme, setColor] = useState("")
    
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("")
    const [posts, setPosts] = useState<any[]>([])
    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };
    
    useEffect(()=>{
        fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(data => setPosts(data))
    })

    const onPost=()=>{
        let obj = {profile, author, content, colorscheme, date}
        setLoading(true)
        setTimeout(() => {
            
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
    return(
        <>
        
        <div className='page_container'>
                <div >
                    
                    
                    
                    
                    <InfiniteScroll
                    style={{padding:"1rem"}}
                    className='procard_container'
                    dataLength={1}
                    next={()=>{}}
                    hasMore={false}
                    loader={<div className='loader'><LoadingOutlined style={{fontSize:"2rem"}}/></div>}
                    endMessage={
                        <div className='loader'>
                            <p style={{ textAlign: 'center' }}>
                            <b></b>
                        </p>
                        </div>
                        
                      }
                      
                    
                    >
                    {
                    posts.map((posts)=>(
                        <Post key={posts.author} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" />
                    ))
                    }
                    </InfiniteScroll>

                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No new Posts</span>}/> 

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
                    
                <TextArea allowClear bordered={false} onChange={e=>setContent(e.target.value)} style={{fontFamily:"Supreme", fontSize:"1rem"}} rows={8} maxLength={200} placeholder='Write your thoughts here'/>
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
                {/* <Select
                        defaultValue="white"
                        style={{ width: 120, marginLeft:"1rem" }}
                        
                        options={[
                            { value: 'white', label: 'White' },
                            { value: 'black', label: 'Black' },
                            { value: 'sad', label: 'Sad' },
                            { value: 'royal', label: 'Royal' },
                        ]}
                    /> */}
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
                    
                    
                    
                </div>
            </div>
            
            
            <div className='empty'></div>
        </>
    )
}