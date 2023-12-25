
import { useEffect, useState } from "react";


interface Props {
    bookmarkcount:number
    bookmarked:boolean
    id:string
}

export default function BookmarkButton(props:Props){

    let [likestate, setLikestate] = useState("/bookmark.png")
    let [bookmarked, setBookmarked] = useState(props.bookmarked)

    useEffect(()=>{
        if(bookmarked == false){
            setLikestate("/bookmark.png")
        }
        if(bookmarked == true){
            setLikestate("/bookmark-filled.png")
        }
    })

    const onLike = () =>{
        if (likestate==="/bookmark.png"){
        setBookmarked(true)
          console.log("Liked post")
          
        
            fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({bookmarked: true, bookmarks: ""})
            })
        
        }
        else{
        setBookmarked(false)
          console.log("Removed Like")
          fetch('https://6586a271468ef171392e80df.mockapi.io/posts/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({bookmarked: false, bookmarks: ""})
            })
        }
      }

      
    
    return(
        <>
        <button id="like_btn" onClick={onLike} className=' no_bg no_border procard_buttons'>
            <img alt="Like" className='footer_icon' src={likestate}></img>
            <p className='like_count'>{props.bookmarkcount}</p>
        </button>
        </>
    )
}