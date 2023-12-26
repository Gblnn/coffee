import { ProCard } from "@ant-design/pro-components";
import { Button, ConfigProvider, Drawer, Dropdown, MenuProps, Modal, Select, Typography, message } from "antd";
import {EllipsisOutlined} from '@ant-design/icons';

import CommentButton from "./commentbutton";
import LikeButton from "./likebutton";
import BookmarkButton from "./bookmarkbutton";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";


interface Props {
    id:string
    profile: string;
    author: string;
    date: string;
    content:string;
    likes:number;
    comments:string;
    bookmarks:number;
    colorscheme:string;
    admin:string;
    liked:boolean;
    bookmarked:boolean
    time:string
}


export default function Post(props: Props){

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  // const [warn, setWarn] = useState(false);
  const [postable, setPostable] = useState(false)
  const [colorscheme, setColor] = useState("")
  // let [author, setAuthor] = useState("");
  const [content, setContent] = useState("")
  let date = new Date().toLocaleDateString()
  let hours = new Date().getHours()
  let minutes = new Date().getMinutes()
  let time = hours+":"+minutes

  useEffect(()=>{
    if(content==""){
        setPostable(false)
    }
    else{
        setPostable(true)
    }
    // if(author.length > 6){
    //     setWarn(true)
    // }
    // else{
    //     setWarn(false)
    // }
    // if (author.length > 6){
    //     setPostable(false)
    // }
    
})

  const Reload = () =>{
    setTimeout(()=>{
        window.location.reload()
    },1000)
    
  }

  const showDrawer = () => {
    setOpen(true);
    
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    message.loading("Deleting")
    fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }        
      })
      Reload()
  }

  const handleEdit = () => {
    showDrawer()
  }

  const onDelete = () =>{
    Modal.confirm({
      centered:true,
      title: "Confirm Delete?",
      content: 'This action can not be undone',
      okText:"Confirm",
      cancelText:"Cancel",
      onOk:handleDelete,
      okButtonProps:{style:{background:"black"}},
      cancelButtonProps:{style:{borderColor:"rgb(175,175,175)", color:"black"}}
    });   
}

  const onEdit = () => {
    Modal.confirm({
      centered:true,
      title:"Edit Post?",
      content:"Confirm edit post",
      okText:"Edit",
      cancelText:"Cancel",
      onOk:handleEdit,
      okButtonProps:{style:{background:"black"}},
      cancelButtonProps:{style:{borderColor:"rgb(175,175,175)", color:"black"}}
    })
  }

  // Dropdown Menu Items
  const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a onClick={onEdit}>
              Edit Post
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={onDelete}>
              Delete Post 
            </a>
          ),
        },
  ];

  const onPost=()=>{
    setLoading(true)
    setTimeout(() => {
        message.loading("Updating")
        fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({ content:content, colorscheme:colorscheme, date:date, time:time})
            })
        setLoading(false)
        onClose()
        Reload()
    }, 1000);
    
    
}

      
    return(
        <>
        
        <ProCard id={props.id} className='procard' style={{ borderRadius:"1rem"}}>

            {/* Header */}
            <div className='procard_header'>

                <div className='procard_profile'>
                    <img alt="icon" className='procard_img' src={props.profile}></img>
                    <Typography.Text className='procard_name'>{props.author}</Typography.Text>
                    <Typography.Text id="transclucent" style={{fontSize:"0.75rem",paddingLeft:"0.5rem", paddingRight:"0.5rem"}}>{props.date}</Typography.Text>
                </div>

                <div className="procard_right">
                  <Typography style={{fontSize:"0.75rem"}}>{props.time}</Typography>
                  {
                    props.author=="gbln"?
                    <Dropdown trigger={['click']} menu={{items}} placement="bottomLeft" arrow>
                      <button style={{display:"hidden", cursor:"pointer"}} id={props.admin} className="no_bg no_border">
                      <EllipsisOutlined style={{fontSize:"1.5rem"}}/>
                      </button>
                  </Dropdown>:null
                  }
                  
                </div>
                
            </div>
            
            {/* Content */}
            <div id={props.colorscheme} className='procard_content'>
                <h1 id={props.colorscheme} className='procard_text'>"{props.content}"</h1>
            </div>
            
            {/* Footer */}
            <div className='procard_footer'>

                {/* Like & Comment Buttons */}
                <div className="footer_left">
                  <LikeButton id={props.id} liked={props.liked} likecount={props.likes}/>
                  <CommentButton comments={props.comments}/>
                </div>

                {/* Bookmark Button */}
                <BookmarkButton id={props.id} bookmarked={props.bookmarked} bookmarkcount={props.bookmarks}/>
                
          
            </div>                                   
        </ProCard>
        <Drawer placement='bottom' size='default' title={"Edit Post"} onClose={onClose} open={open}>
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
                    {/* <Tooltip title="Max limit is 6 characters" placement="topLeft" open={warn}>
                        <Input onChange={e=>setAuthor(e.target.value)} style={{fontWeight:700}} bordered={false} placeholder="How you'll appear"></Input>
                      </Tooltip> */}
                        
                        
                    
                    
                    
                    
                    <TextArea allowClear bordered={false} onChange={e=>setContent(e.target.value)} style={{fontFamily:"Supreme", fontSize:"16px"}} rows={7} maxLength={200} placeholder='Second thoughts'/>
                    
                    
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
                                { value: 'sky', label: 'Sky' }
                            ]}
                        />
                </Drawer>
        </>
    )
}