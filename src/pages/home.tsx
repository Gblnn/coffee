import '../styles/colorscheme.css'
import Post from '../components/post';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../components/postaction.tsx';
import {LoadingOutlined} from '@ant-design/icons'
import { FloatButton } from 'antd';



export default function Home(){

    // const Reload = () =>{
    //     message.loading("Refreshing")
    //     setTimeout(()=>{
    //         window.location.reload()
    //     },1000)       
    //   }

    const [posts, setPosts] = useState<any[]>([])
    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                console.log(data)
            })
    },[])


    // useEffect(()=>{
    //     setTimeout(()=>{
    //         Reload()
    //     },60000)
    // },[])
   
        
        
    
    return(
        <>
        
        <div className='page_container'>
                
            <div >
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
                        <Post id={posts.id}  key={posts.id} profile={posts.profile} author={posts.author} date={posts.date} content={posts.content} likes={posts.likes} comments={posts.comments} bookmarks={posts.bookmarks} colorscheme={posts.colorscheme} admin="" liked={posts.liked} bookmarked={posts.bookmarked} time={posts.time} />
                    ))
                    }
                        </div>                 
                    
                    
                </InfiniteScroll>
                <div className='big_empty'></div>         
            </div>
        </div>
            
            
        <FloatButton.Group shape="square" style={{ right: 24 }}>  
            <FloatButton.BackTop/>
            <PostAction/>
        </FloatButton.Group>
        
        </>
    )
}