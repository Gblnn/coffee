import '../styles/colorscheme.css'
import Post from '../components/post';
import {LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../components/postaction.tsx';
import { Empty } from 'antd';


export default function Liked(){

    const [posts, setPosts] = useState<any[]>([])
    useEffect(()=>{
        
            fetch("https://6586a271468ef171392e80df.mockapi.io/posts?liked=true")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                console.log(data)
            })
        
    },[])
   
        
        
    
    return(
        <>
        <div className='page_container'>
                
            <div >
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
                        <div className='procard_container'>
                        {
                        posts==null?<Empty/>:
                    posts.map((posts)=>(
                        <Post id={posts.id}  key={posts.id} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" liked={posts.liked} bookmarked={posts.bookmarked}/>
                    ))
                    }
                            </div>                 
                    
                </InfiniteScroll>         
            </div>
        </div>
            
            
        <div className='empty'></div>
        <PostAction/>
        </>
    )
}