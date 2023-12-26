import { Button, ConfigProvider, Input } from "antd";
import {ArrowUpOutlined} from '@ant-design/icons'
import { useState } from "react";
import ChatInput from "../components/chat";

export default function Chats(){

    const [chat, setChat] = useState("")

    const handleSend = () => {
        console.log(chat)
    }

    return(
        <>
        <Input style={{fontWeight:700}} bordered={false} placeholder="How you'll appear"></Input>
        <div className="chat_container">
            <div className="comment_container">
            <ChatInput author="user" message="Message"/>
            <ChatInput author="user" message="Message"/>
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