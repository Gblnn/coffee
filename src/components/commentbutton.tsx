import { Button, ConfigProvider, Drawer, Input } from "antd";
import { useEffect, useState } from "react";
import ChatInput from "./chat";


interface Props {
    comments:string
}

export default function CommentButton(props:Props) {

    const [posts, setPosts] = useState<any[]>([])
  
    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts?id=1")
        .then(res => res.json())
        .then(data => setPosts(data))
    })

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };

    const onPost = () => {
        posts.map((post)=>{           
            post.commentlist.map((items:any) => {
                console.log(items.author)
                console.log(items.comment)
                {
                  <ChatInput author={items.author} message={items.comment}/>
                }
            })           
        })
    }

    return(
        <>
        <button id="comment_btn" className='no_bg no_border procard_buttons' onClick={showDrawer}>
            <img alt="Comment" className='footer_icon' src='/comment.png'></img>
            <p className='like_count'>{props.comments}</p>
        </button>
        <Drawer size="large" title={"Comments"} onClose={onClose} open={open}>           
            <div className="comment_container">
            {
                    posts.map((posts)=>(
                      posts.commentlist.map((items:any)=>{
                        <ChatInput author={items.author} message={items.comment} />
                      })
                    ))
                    }  
                <ChatInput author="user" message="Comment"/>
                  </div>
                    <div className="flex">
                    
                    <ConfigProvider
                    theme={{
                        token: {
                        colorPrimary:"black",
                        linkFocusDecoration:"none"
                        }
                    }}
                    >
                      
                      <Input placeholder="Add a comment" style={{marginRight:"1rem", fontSize:"16px"}}></Input>
                      <Button onClick={onPost} type="primary">Post</Button>
                      
                    </ConfigProvider>                   
                    </div>

                </Drawer>
        </>
    )
}