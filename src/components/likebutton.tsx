
import { useEffect, useState } from "react";


interface Props {
    likecount:number
    liked:boolean
    id:string
}

export default function LikeButton(props:Props){
    let [likestate, setLikestate] = useState("/heart.png")
    let [liked, setLiked] = useState(props.liked)

    useEffect(()=>{
        if(liked == false){
            setLikestate("/heart.png")
        }
        if(liked == true){
            setLikestate("/heart-filled.png")
        }
    })

    const onLike = () =>{
        if (likestate==="/heart.png"){
        setLiked(true)
          console.log("Liked post")

            fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({liked: true, likes:1})
            })
          
        }
        else{
        setLiked(false)
          console.log("Removed Like")
          fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({liked: false, likes:""})
            })
        }
      }

      
    
    return(
        <>
        <button id="like_btn" onClick={onLike} className=' no_bg no_border procard_buttons'>
            <img alt="Like" className='footer_icon' src={likestate}></img>
            <p className='like_count'>{props.likecount}</p>
        </button>
        </>
    )
}