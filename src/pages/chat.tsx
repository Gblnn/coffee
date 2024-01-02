import { Button, ConfigProvider, Input } from "antd";
import {ArrowUpOutlined} from '@ant-design/icons'
import { useState } from "react";


export default function Chats(){

    const [chat, setChat] = useState("")

    //     const [posts, setPosts] = useState<any[]>([])
  
    // useEffect(()=>{
    //     fetch("https://6586a271468ef171392e80df.mockapi.io/posts?id=1")
    //     .then(res => res.json())
    //     .then(data => setPosts(data))
    // },[])

    const handleSend = () => {
        console.log(chat)
    }

    return(
        <>
        <Input style={{fontWeight:700}} bordered={false} placeholder="How you'll appear"></Input>
        <div className="chat-container">
            <div className="comment-container">
            
            {/* {
                posts.map((post)=>(           
                    post.commentlist.map((items:any) => {
                        <ChatInput author={post.author} message={items.comment}/>
                        console.log(items.author)
                        console.log(items.comment)
                    })           
                ))
            } */}
            </div>

            <div className="flex">          
            <ConfigProvider
            theme={{
                token: {
                    colorPrimary:"black"
                    }
                }}
                    >
                <Input onChange={e=>setChat(e.target.value)} placeholder="Message" style={{marginRight:"1rem", fontSize:"16px"}}></Input>
                <Button onClick={handleSend} type="primary">Send<ArrowUpOutlined/></Button>
            </ConfigProvider>
                    
        </div>
            
        </div>
        
        </>
    )
}