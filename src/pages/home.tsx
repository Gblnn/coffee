import Post from '../components/post';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../components/postaction.tsx';
import {LoadingOutlined} from '@ant-design/icons'
import { FloatButton, Typography } from 'antd';


export default function Home(){

    const [posts, setPosts] = useState<any[]>([])
    const user_data = window.name
   
    //Fetching Posts from MockAPI
    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
    },[])
    
    return(
        <>

        <div className='userid'>
            <button className='hoverable' style={{zIndex:10,userSelect:"none",alignItems:"center",justifyContent:"center",display:"flex", gap:"0.25rem", paddingLeft:"0.75rem",paddingRight:"0.75rem", border:"1px solid rgb(220,220,220)", borderRadius:"1rem"}}>
                <img src='/coffee.png' style={{width:"1.2rem"}}></img>
                <Typography style={{fontFamily:"Supreme",fontSize:"0.9rem", fontWeight:"600"}}>{user_data}</Typography>
            </button>
        </div>
        
        <div className='page-container'>
                
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


                    <div className='procard-container'>
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

        {/* Add Post/ Back to Top    */}
        <FloatButton.Group shape="square" style={{ right: 24 }}>  
            <FloatButton.BackTop/>
                <PostAction userdata={user_data}/>
        </FloatButton.Group>
        
        </>
    )
}