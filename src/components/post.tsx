import { ProCard } from "@ant-design/pro-components";
import { Dropdown, MenuProps, Modal, Typography } from "antd";
import {EllipsisOutlined} from '@ant-design/icons';

import CommentButton from "./commentbutton";
import LikeButton from "./likebutton";
import BookmarkButton from "./bookmarkbutton";


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

  const Reload = () =>{
    setTimeout(()=>{
        window.location.reload()
    },1000)
    
  }

  const handleDelete = () => {
    fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }        
      })
      Reload()
  }

  const onDelete = () =>{
    Modal.confirm({
      centered:true,
      title: 'Confirm Delete?',
      content: 'This action can not be undone',
      okText:"Confirm",
      cancelText:"Cancel",
      onOk:handleDelete,
    });   
}

  // Dropdown Menu Items
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

            {/* Header */}
            <div className='procard_header'>

                <div className='procard_profile'>
                    <img alt="icon" className='procard_img' src={props.profile}></img>
                    <Typography.Text className='procard_name'>{props.author}</Typography.Text>
                    <Typography.Text id="transclucent" style={{fontSize:"0.75rem",paddingLeft:"0.5rem", paddingRight:"0.5rem"}}>{props.date}</Typography.Text>
                </div>

                <div className="procard_right">
                  <Typography style={{fontSize:"0.75rem"}}>{props.time}</Typography>
                  <Dropdown trigger={['click']} menu={{items}} placement="bottomLeft" arrow>
                      <button style={{display:"hidden", cursor:"pointer"}} id={props.admin} className="no_bg no_border">
                      <EllipsisOutlined style={{fontSize:"1.5rem"}}/>
                      </button>
                  </Dropdown>
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
        </>
    )
}