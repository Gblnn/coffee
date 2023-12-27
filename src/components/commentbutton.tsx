import { Button, ConfigProvider, Drawer, Input, message } from "antd";
import { useEffect, useState } from "react";
import ChatInput from "./chat";

interface Props {
    comments:string
    postid:string
}



export default function CommentButton(props:Props) {

    let [comment, setComment] = useState("")
    let user = "user"
    let postid = props.postid
    let date = new Date().toLocaleDateString()
    let [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
  

    useEffect(()=>{

    },[])

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
      fetch("https://658c3fd2859b3491d3f5c978.mockapi.io/comments?postid="+postid)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
    };
    
      const onClose = () => {
        setOpen(false);
      };

      const Reload = () =>{
        message.loading("Posting")
        setLoading(true)
        setTimeout(()=>{
          setLoading(false)
          window.location.reload()
        },1000)
        
      }

      

    const onPost = () => {

      let obj = {postid, user, comment, date}
      
      
      fetch("https://658c3fd2859b3491d3f5c978.mockapi.io/comments",
      {
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(obj)
      }
      )
    
        Reload()
    
        
    
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
                  
                  String(posts.length)=="9"?null:
                  posts.map((post)=>(
                    <ChatInput date={post.date} id={post.id} key={post.id} author={post.user} message={post.comment}/>
                  ))
                 
                }
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
                      <Input onChange={e=>setComment(e.target.value)} placeholder="Add a comment" style={{marginRight:"1rem", fontSize:"16px"}}></Input>
                      <Button loading={loading} onClick={onPost} type="primary">Post</Button>
                      
                    </ConfigProvider>                   
                    </div>

                </Drawer>
        </>
    )
}