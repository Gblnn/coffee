import { Button, ConfigProvider, Drawer, FloatButton, Input, Select, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import {PlusOutlined} from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea";


interface Props {
    userdata : string
}

export default function PostAction(props:Props){
    let [author, setAuthor] = useState("")
    const profile = "/coffee.png"
    let commentlist = ['']
    let likes = ""
    let liked = false
    let bookmarked = false
    let comments = ""
    let date = new Date().toLocaleDateString()
    
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let hrs = hours.toString()
    let mins = minutes.toString()
    const [colorscheme, setColor] = useState("")
    const [content, setContent] = useState("")
    const [open, setOpen] = useState(false);
    const [postable, setPostable] = useState(false)
    const [warn, setWarn] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(content==""){
            setPostable(false)
        }
        else{
            setPostable(true)
        }
        if(author.length > 6){
            setWarn(true)
        }
        else{
            setWarn(false)
        }
        if (author.length > 6){
            setPostable(false)
        }
        if (minutes<10){
            mins = "0"+mins
        }
        
    })

    let time = (hrs+":"+mins).toString()

    const showDrawer = () => {
        setOpen(true);
        console.log(time)
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
            author=props.userdata
        }
        else{
            author = author.toLowerCase()
        }
        
        let obj = {profile, author, content, colorscheme, date, time, commentlist, likes, comments, liked, bookmarked}
        
        setLoading(true)
        setTimeout(() => {
            message.loading("Posting")
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
                    >   <Tooltip title="Max limit is 6 characters" placement="topLeft" open={warn}>
                        
                        <Input disabled value={props.userdata} onChange={e=>setAuthor(e.target.value)} style={{fontWeight:700}} bordered={false} placeholder="How you'll appear"></Input>
                        </Tooltip>
                        
                        
                    
                    
                    
                    
                    <TextArea allowClear bordered={false} onChange={e=>setContent(e.target.value)} style={{fontFamily:"Supreme", fontSize:"16px"}} rows={7} maxLength={200} placeholder='Write your thoughts here'/>
                    
                    
                    </ConfigProvider>
                    
                    <div className='empty' style={{marginTop:"0.75rem"}}></div>
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
                                { value: 'sky', label: 'Sky' },
                                { value: 'coffee', label: 'Coffee' }
                            ]}
                        />
                </Drawer>
        </>
    )
}