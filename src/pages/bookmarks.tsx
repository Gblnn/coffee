import '../styles/colorscheme.css'
import Post from '../components/post';
import {LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Typography } from 'antd';



export default function bookmarks(){

    const [posts, setPosts] = useState<any[]>([])
    const user_data = window.name

    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts?bookmarked=true")
        .then(res => res.json())
        .then(data => {
            setPosts(data)
         
        })
        
    },[]) 
    
    return(
        <>
        <div className='userid'>
            <div className='hoverable' style={{userSelect:"none",boxShadow:"1px 1px 5px rgb(200,200,200)",alignItems:"center",justifyContent:"center",display:"flex", gap:"0.25rem", paddingLeft:"0.75rem",paddingRight:"0.75rem", border:"1px solid rgb(220,220,220)", borderRadius:"1rem"}}>
                <img src='/coffee.png' style={{width:"1.2rem"}}></img>
                <Typography style={{fontFamily:"Supreme",fontSize:"0.9rem", fontWeight:"600"}}>{user_data}</Typography>
            </div>
        
        </div>
        <div className='page_container'>
            
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
                    String(posts.length)=="0"?null:
                    posts.map((posts)=>(
                        <Post id={posts.id}  key={posts.id} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" liked={posts.liked} bookmarked={posts.bookmarked} time={posts.time} activeuser={user_data==posts.author}/>
                    ))
                    }
                </div>                 
                    
            </InfiniteScroll>         
            
        </div>
            
            
        <div className='empty'></div>
        
        </>
    )
}