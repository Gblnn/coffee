
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
        <button id="like-btn" onClick={onLike} className=' no-bg no-border procard-buttons'>
            <img alt="Like" className='footer-icon' src={likestate}></img>
            <p style={{color:"#8a8a8a"}} className='like-count'>{props.likecount}</p>
        </button>
        </>
    )
}