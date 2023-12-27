import { Typography } from "antd";

interface Props {
    id:string
    message:string
    author:string
    date:string
}

export default function ChatInput(props:Props){
    return(
        <>
        <div id={props.id}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <Typography style={{textTransform:"uppercase",fontSize:"0.75rem", fontWeight:700}}>{props.author}</Typography>
        <p style={{fontSize:"0.75rem"}}>{props.date}</p>
        </div>
        
        <Typography style={{fontFamily:"Supreme",marginBottom:"0.5rem",padding:"0.25rem",background:"rgb(245,245,245)", borderLeft:"4px solid black",paddingLeft:"0.5rem",fontSize:"16px"}}>{props.message}</Typography>
        
        
        </div>
        
        </>
    )
}