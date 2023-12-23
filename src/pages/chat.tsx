// import { Button, ConfigProvider, Input } from "antd";
// import {ArrowUpOutlined} from '@ant-design/icons'
// import { useState } from "react";

// export default function Chats(){

//     const [chat, setChat] = useState("")

//     const handleSend = () => {

//     }

//     return(
//         <>
//         <div className="page_container">

//         </div>
//         <div className="flex">
                    
//                     <ConfigProvider
//                     theme={{
//                         token: {
//                         colorPrimary:"black"
//                         }
//                     }}
//                     >
//                       <Input onChange={e=>setChat(e.target.value)} placeholder="Type here" style={{marginRight:"1rem", fontSize:"16px"}}></Input>
//                       <Button onClick={handleSend} type="primary">Send<ArrowUpOutlined/></Button>
//                     </ConfigProvider>
                    
//                     </div>
//         {/* <Input style={{bottom:0}}/> */}
//         </>
//     )
// }