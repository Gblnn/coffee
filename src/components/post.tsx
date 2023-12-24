import { ProCard } from "@ant-design/pro-components";
import { Button, Dropdown, MenuProps, Modal, Typography, message } from "antd";
import {EllipsisOutlined} from '@ant-design/icons';

import CommentButton from "./commentbutton";
;

interface Props {
    id:string
    profile: string;
    author: string;
    date: string;
    content:string;
    likes:string;
    comments:string;
    bookmarks:string;
    colorscheme:string;
    admin:string;
}


export default function Post(props: Props){

  const onDeleteDropdown = () =>{
  }

  const onDelete = () =>{
    Modal.info({
      centered:true,
      title: 'Confirm Delete?',
      content: 'This action can not be undone',
      footer:[
        <div style={{ display:"flex", justifyContent:"flex-end", gap:"0.5rem", marginTop:"1rem"}}>
          <Button>Cancel</Button>
          <Button type="primary">Confirm</Button>
        </div>
        
      ],
    
      onOk(){
        fetch('https://6586a271468ef171392e80df.mockapi.io/posts/1', {
              method: 'DELETE',
            }).then(res => {
              if (res.ok) {
                  return res.json();
              }
            })
      },
      onCancel(){
  
      }
      
    });
     
}
const onLike = () =>{
  console.log("Liked post")
  message.info("Liked Post")
}
const onBookmarked = () =>{
  console.log("Liked post")
  message.success("Saved to bookmarks")
}

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a>
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

    return(
        <>
        
        <ProCard id={props.id} className='procard' style={{ borderRadius:"1rem"}}>
            <div className='procard_header'>
                <div className='procard_profile'>
                    <img alt="icon" className='procard_img' src={props.profile}></img>
                    <Typography.Text className='procard_name'>{props.author}</Typography.Text>
                    <Typography.Text id="transclucent" style={{fontSize:"0.75rem",paddingLeft:"0.5rem", paddingRight:"0.5rem"}}>{props.date}</Typography.Text>
                </div>
                <Dropdown trigger={['click']} menu={{items}} placement="bottomLeft" arrow>
                    <button onClick={onDeleteDropdown} style={{display:"hidden", cursor:"pointer"}} id={props.admin} className="no_bg no_border">
                    <EllipsisOutlined style={{fontSize:"1.5rem"}}/>
                    </button>
                </Dropdown>
            </div>
            
            <div id={props.colorscheme} className='procard_content'>
                <h1 id={props.colorscheme} className='procard_text'>"{props.content}"</h1>
            </div>
            
            
            <div className='procard_footer'>
                <div className="footer_left">
                <button onClick={onLike} className=' no_bg no_border procard_buttons'>
                    <img className='footer_icon' src='/heart.png'></img>
                    <p className='like_count'>{props.likes}</p>
                </button>
                <CommentButton comments={props.comments}/>
                </div>
                
                <button onClick={onBookmarked} className=' no_bg procard_buttons'>
                    <p className='like_count'>{props.bookmarks}</p>
                    <img className='footer_icon' src='/bookmark.png'></img> 
                </button>
          
            </div>                                   
        </ProCard>
        </>
    )
}