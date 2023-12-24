import { Button, ConfigProvider } from "antd";
import { useEffect, useState } from "react";

export default function FetchTest(){

    const [posts, setPosts] = useState<any[]>([])
  
    useEffect(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/posts?id=1")
        .then(res => res.json())
        .then(data => setPosts(data))
    })

    const onFetch = () =>{
        // window.location.reload()
        posts.map((post)=>{           
            post.commentlist.map((items:any) => {
                console.log(items.author)
                console.log(items.comment)
            })           
        })
    }
    return(
        <>
        <ConfigProvider
            theme={{
                token: {
                        colorPrimary:"crimson"
                        }
                    }}
        >
            <Button style={{marginRight:"1rem",marginLeft:"1rem"}} type="primary" onClick={onFetch}>TEST</Button>
        </ConfigProvider>
        
        </>
    )
}