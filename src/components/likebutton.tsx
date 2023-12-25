import { message } from "antd";
import { useEffect, useState } from "react";


interface Props {
    likecount:number
}

export default function LikeButton(props:Props){

    const [likestate, setLikestate] = useState("/heart.png")

    const onLike = () =>{
        if (likestate==="/heart.png"){
          setLikestate("/heart-filled.png")
          console.log("Liked post")
          message.info("Liked Post")
        }
        else{
          setLikestate("/heart.png")
          console.log("Removed Like")
          message.info("Removed Like")
        }
      }

      useEffect(()=>{
        fetch('https://6586a271468ef171392e80df.mockapi.io/posts', {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify({liked: "true"})
        }).then(res => {
        if (res.ok) {
            return res.json();
        }
})
      })
    
    return(
        <>
        <button id="like_btn" onClick={onLike} className=' no_bg no_border procard_buttons'>
            <img alt="Like" className='footer_icon' src={likestate}></img>
            <p className='like_count'>{props.likecount}</p>
        </button>
        </>
    )
}