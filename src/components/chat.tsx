import { Button, Dropdown, Modal, Typography } from "antd";
import {MoreOutlined} from '@ant-design/icons'
import { MenuProps } from "antd/lib";

interface Props {
    id:string
    message:string
    author:string
    date:string
}

export default function ChatInput(props:Props){

    const onDelete = () =>{
        Modal.confirm({
            centered:true,
            title: "Delete Comment?",
            content: 'This action can not be undone',
            okText:"Delete",
            cancelText:"Cancel",
            onOk:handleDelete,
            okButtonProps:{style:{background:"black"}},
            cancelButtonProps:{style:{borderColor:"rgb(175,175,175)", color:"black"}}
          });
    }

    const handleDelete = () => {
        fetch("https://658c3fd2859b3491d3f5c978.mockapi.io/comments?postid="+props.id, {
      method: 'DELETE',
    })
    }

    // Dropdown Menu Items
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={onDelete}>
          Delete Post 
        </a>
      ),
    }
];
    return(
        <>
        <div id={props.id}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <Typography style={{textTransform:"uppercase",fontSize:"0.75rem", fontWeight:700}}>{props.author}</Typography>
        <p style={{fontSize:"0.6rem"}}>{props.date}</p>
        </div>
        <div className="chat_option_btn" style={{display:"flex",marginBottom:"0.5rem", justifyContent:"space-between", alignItems:"center", background:"rgb(240,240,240)"}}>
        <Typography style={{fontFamily:"Supreme",padding:"0.25rem", borderLeft:"4px solid black",paddingLeft:"0.5rem",fontSize:"16px"}}>{props.message}</Typography>
        <Dropdown trigger={['click']} menu={{items}} placement="topLeft">
        <Button className="no_bg no_border"><MoreOutlined/></Button>
        </Dropdown>
        
        </div>
        
        
        
        </div>
        
        </>
    )
}