
import InfiniteScroll from "react-infinite-scroll-component";
import {LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from "react";
import Post from "../components/post";
;
import { Empty } from "antd";
import PostAction from "../components/postaction";



export default function Posts(){

    const container = document.getElementById('container')
    if (container?.childNodes.length == 1){
         <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No new Posts</span>}/>  
    }
    

    
    
    
    const [posts, setPosts] = useState<any[]>([])
    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts")
        .then(res => res.json())
        .then(data => setPosts(data))
    })

    
    return(
        <>
        
        <div className='page_container'>
                <div id="container" >
                    
                    
                    
                    
                    <InfiniteScroll
                    
                    style={{padding:"1rem"}}
                    className='procard_container'
                    dataLength={1}
                    next={()=>{}}
                    hasMore={false}
                    
                    loader={<div className='loader'><LoadingOutlined style={{fontSize:"2rem"}}/></div>}
                    endMessage={
                        <div className='loader'>
                            <p style={{ textAlign: 'center' }}>
                            <b></b>
                        </p>
                        </div>
                        
                      }
                      
                    
                    >
                    {
                    
                    posts.map((posts)=>(
                        <Post key={posts.author} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" />
                    ))
                    }
                    </InfiniteScroll>

                    

                   <PostAction/>
                    
                    
                    
                </div>
            </div>
            
            
            <div className='empty'></div>
        </>
    )
}