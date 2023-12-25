import { Button, ConfigProvider, Drawer, FloatButton, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import {PlusOutlined} from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea";


export default function PostAction(){

    let [author, setAuthor] = useState("")
    const profile = "/coffee.png"
    let commentlist = ['']
    let likes = 0
    let liked = false
    let bookmarked = false
    let comments = ""
    let date = new Date().toLocaleDateString()
    const [colorscheme, setColor] = useState("")
    const [content, setContent] = useState("")
    
    

    const [open, setOpen] = useState(false);
    const [postable, setPostable] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(content==""){
            setPostable(false)
        }
        else{
            setPostable(true)
        }
    })

    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };

      const Reload = () =>{
        setTimeout(()=>{
            window.location.reload()
        },1000)
        
      }

      const onPost=()=>{
        if (author===""){
            author="unknown"
        }
        
        let obj = {profile, author, content, colorscheme, date, commentlist, likes, comments, liked, bookmarked}
        
        setLoading(true)
        setTimeout(() => {
            message.success("Posted Sucessfully")
            fetch("https://6586a271468ef171392e80df.mockapi.io/posts",
            {
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(obj)
            }
            )
            setLoading(false)
            onClose()
            Reload()
        }, 1000);
        
        
    }
    return(
        <>
        <FloatButton onClick={showDrawer} shape='square' icon={<PlusOutlined/>}/>
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
                    <Input onChange={e=>setAuthor(e.target.value)} style={{fontWeight:700}} bordered={false} placeholder="How you'll appear"></Input>
                    
                    
                    <TextArea allowClear bordered={false} onChange={e=>setContent(e.target.value)} style={{fontFamily:"Supreme", fontSize:"16px"}} rows={7} maxLength={200} placeholder='Write your thoughts here'/>
                    
                    
                    </ConfigProvider>
                    
                    <div className='empty'></div>
                    <ConfigProvider
                        theme={{
                            token: {
                            colorPrimary:"black"
                            }
                        }}
                        >
                        <Button style={{width:"6rem"}} type='primary' onClick={onPost} loading={loading}  disabled={!postable}>Post</Button>
                        
                    </ConfigProvider>

                        <Select
                            defaultValue="white"
                            style={{ width: 120, marginLeft:"1rem", fontSize:"16px" }}
                            onChange={setColor}
                            options={[
                                { value: 'white', label: 'White' },
                                { value: 'black', label: 'Dark' },
                                { value: 'sad', label: 'Night' },
                                { value: 'royal', label: 'Neon' },
                                { value: 'pink', label: 'Pink' },
                            ]}
                        />
                </Drawer>
        </>
    )
}