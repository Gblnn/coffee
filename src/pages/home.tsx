import '../styles/colorscheme.css'
import Post from '../components/post';
import {post} from '../posts.ts'
import {LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../components/postaction.tsx';
import FetchTest from '../components/fetchtest.tsx';
import { PageHeader } from '@ant-design/pro-layout';


export default function Home(){

    
    const [posts, setPosts] = useState<any[]>([])
    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts")
        .then(res => res.json())
        .then(data => setPosts(data))
    })
    
      
      

    return(
        <>
        
            <PageHeader>
                <FetchTest/>
            </PageHeader>
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
                        
                      }
                      
                    
                    >
                    {
                    post.map((item)=>(
                    
                    <Post id={item.id} key={item.id} admin={item.admin} author={item.author} profile={item.profile} date={item.date} content={item.content} likes={item.likes} comments={item.comments} bookmarks={item.bookmarks} colorscheme={item.colorscheme}
                    />))
                    }
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
        

            
            
        
        {/* <Layout>
            <Header style={{color:"white"}}>COFFEE</Header>
            <Layout>
                <Sider>
                <Menu className="sidemenu"
                items={[
                    {
                        label:"Home",
                        key:"home"
                    },
                    {
                        label:"Likes",
                        key:"likes"
                    },
                    {
                        label:"Bookmarks",
                        key:"bookmarks"
                    },
                    {
                        label:"Posts",
                        key:"posts"
                    },
                    {
                        label:"Profile",
                        key:"profile",
                        children:[
                            {
                            label:"Current account",
                            key:"ca"
                            },
                            {
                                label:"Add account",
                                key:"aa"
                                },
                        ]
                    },
                ]} 
                />          
                </Sider>
                <Content>
                    <div className="Content">

                    </div>
                </Content>
            </Layout>
            <Footer>footer</Footer>
        </Layout> */}
        {/* <ProTable></ProTable> */}
        </>
    )
}