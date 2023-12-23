import { Button, ConfigProvider, Drawer, FloatButton, Select, message } from "antd";
import { useState } from "react";
import {PlusOutlined} from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea";


export default function PostAction(){

    const author = "user"
    const profile = "/coffee.png"
    let commentlist = ['']
    let likes = ""
    let comments = ""
    let date = new Date().toLocaleDateString()
    const [colorscheme, setColor] = useState("")
    const [content, setContent] = useState("")


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };

      const reloadPage = () => {
        setTimeout(()=>{
            window.location.reload()
        },2000)
      }

      const onPost=()=>{
        let obj = {profile, author, content, colorscheme, date, commentlist, likes, comments}
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
            reloadPage()
            
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

                        <Select
                            defaultValue="white"
                            style={{ width: 120, marginLeft:"1rem" }}
                            onChange={setColor}
                            options={[
                                { value: 'white', label: 'White' },
                                { value: 'black', label: 'Black' },
                                { value: 'sad', label: 'Sad' },
                                { value: 'royal', label: 'Red' },
                                { value: 'pink', label: 'Pink' },
                            ]}
                        />
                </Drawer>
        </>
    )
}