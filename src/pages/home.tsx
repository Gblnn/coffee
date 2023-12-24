import '../styles/colorscheme.css'
import Post from '../components/post';
import {LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../components/postaction.tsx';


export default function Home(){

    const [posts, setPosts] = useState<any[]>([])
    useEffect(()=>{
        setTimeout(()=>{
            fetch("https://6586a271468ef171392e80df.mockapi.io/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                console.log(data)
            })
        },100)
    })
   
        
        
    
    return(
        <>
        <div className='page_container'>
                
            <div >
                <InfiniteScroll
                style={{padding:"1rem"}}
                className='procard_container'
                dataLength={1}
                next={()=>{}}
                hasMore={true}
                loader={<div className='loader'><LoadingOutlined style={{fontSize:"2rem"}}/></div>}
                endMessage={
                    <div className='loader'>
                        <p style={{ textAlign: 'center' }}>
                            <b>You're all caught up</b>
                        </p>
                    </div>  
                      }>                 
                    {
                    posts.map((posts)=>(
                        <Post id={posts.id}  key={posts.id} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" />
                    ))
                    }
                </InfiniteScroll>         
            </div>
        </div>
            
            
        <div className='empty'></div>
        <PostAction/>
        </>
    )
}