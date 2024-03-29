import Post from '../components/post';
import {LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Empty, Typography } from 'antd';



export default function Liked(){

    const [posts, setPosts] = useState<any[]>([])
    const user_data = window.name

    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts?liked=true")
        .then(res => res.json())
        .then(data => {
            setPosts(data)
           
        })
    },[])
   
    return(
        <>
        <div className='userid'>
        <button className='hoverable' style={{zIndex:10,userSelect:"none",alignItems:"center",justifyContent:"center",display:"flex", gap:"0.25rem", paddingLeft:"0.75rem",paddingRight:"0.75rem", borderRadius:"1rem", background:"none"}}>
                <img src='/coffee.png' style={{width:"1.2rem"}}></img>
                <Typography style={{fontFamily:"Supreme",fontSize:"0.9rem", fontWeight:"600", color:"#8a8a8a"}}>{user_data}</Typography>
            </button>
        
        </div>
         
        <div className='page-container'>
            {posts.length==0?<><div className='empty-container'><Empty style={{marginTop:"10%"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No liked posts"/></div></>:
            <InfiniteScroll
                style={{padding:"1rem"}}
                className='container'
                dataLength={1}
                next={()=>{}}
                hasMore={false}
                loader={<div className='loader'><LoadingOutlined style={{fontSize:"2rem"}}/></div>}
                endMessage={
                    <div className='loader'>
                        <p style={{ textAlign: 'center' }}>
                            {/* <b>You've reached the end</b> */}
                        </p>
                    </div>  
                      }>
                        <div className='procard-container'>
                        {
                        String(posts.length)=="9"?null:
                    posts.map((posts)=>(
                        <Post id={posts.id}  key={posts.id} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" liked={posts.liked} bookmarked={posts.bookmarked} time={posts.time} activeuser={posts.author==user_data}/>
                    ))
                    }
                            </div>                 
                    
            </InfiniteScroll> 
            }
                        
            
        </div>   
        <div className='empty'></div>

        
        </>
    )
}