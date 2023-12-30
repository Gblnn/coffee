
import { useEffect, useState } from "react";


interface Props {
    likecount:number
    liked:boolean
    id:string
}



export default function LikeButton(props:Props){
    const [likestate, setLikestate] = useState("/heart.png")
    const [liked, setLiked] = useState(props.liked)
    
    useEffect(()=>{
        if(liked == false){
            setLikestate("/heart.png")
        }
        if(liked == true){
            setLikestate("/heart-filled.png")
        }
    },[liked])

    const onLike = () =>{
        if (likestate==="/heart.png"){
        setLiked(true)
         
            fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({liked: true, likes:1})
            })
          
        }
        else{
        setLiked(false)
          
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