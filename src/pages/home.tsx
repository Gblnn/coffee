import '../styles/colorscheme.css'
import Post from '../components/post';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../components/postaction.tsx';
import {LoadingOutlined} from '@ant-design/icons'
import { FloatButton, Typography } from 'antd';




export default function Home(){

    // const Reload = () =>{
    //     message.loading("Refreshing")
    //     setTimeout(()=>{
    //         window.location.reload()
    //     },1000)       
    //   }

    const [posts, setPosts] = useState<any[]>([])
    // const location = useLocation()
    const user_data = window.name
   

    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                console.log(data)
            })
            
            // user_data.map((data:any)=>{
            //     setAuthor(data.username)
            //     console.log(data)
                
            // }) 
    },[])


    // useEffect(()=>{
    //     setTimeout(()=>{
    //         Reload()
    //     },60000)
    // },[])
   
        
        
    
    return(
        <>
        <div style={{marginRight:"2rem",right:0,position:"fixed",display:"flex", justifyContent:"flex-end"}}>
            <div className='hoverable' style={{userSelect:"none",boxShadow:"1px 1px 5px rgb(200,200,200)",alignItems:"center",justifyContent:"center",display:"flex", gap:"0.25rem", paddingLeft:"0.75rem",paddingRight:"0.75rem", border:"1px solid rgb(220,220,220)", borderRadius:"1rem"}}>
                <img src='/coffee.png' style={{width:"1.2rem"}}></img>
                <Typography style={{fontFamily:"Supreme",fontSize:"0.9rem", fontWeight:"600"}}>{user_data}</Typography>
            </div>
        
        </div>
        
        <div className='page_container'>
                
            <div>
                <InfiniteScroll
                style={{padding:"1rem"}}
                className='container'
                dataLength={1}
                next={()=>{}}
                hasMore={true}
                
                loader={<div className='loader'><LoadingOutlined style={{fontSize:"2rem"}}/></div>}
                endMessage={
                    <div className='loader'>
                        <p style={{ textAlign: 'center' }}>
                            {/* <b>You're all caught up</b> */}
                        </p>
                    </div>  
                      }>
                    <div className='procard_container'>
                    {
                    posts.map((posts)=>(
                        <Post id={posts.id}  key={posts.id} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" liked={posts.liked} bookmarked={posts.bookmarked} time={posts.time} activeuser={user_data==posts.author}/>
                    ))
                    }
                        </div>                 
                    
                    
                </InfiniteScroll>
                <div className='big_empty'></div>         
            </div>
        </div>
            
            
        <FloatButton.Group shape="square" style={{ right: 24 }}>  
            <FloatButton.BackTop/>
                <PostAction userdata={user_data}/>
        </FloatButton.Group>
        
        </>
    )
}