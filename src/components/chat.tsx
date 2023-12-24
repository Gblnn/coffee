import { Typography } from "antd";

interface Props {
    message:string
    author:string
}

export default function ChatInput(props:Props){
    return(
        <>
        <Typography style={{textTransform:"uppercase",fontSize:"0.75rem", fontWeight:700}}>{props.author}</Typography>
        <Typography style={{fontFamily:"Supreme",marginBottom:"0.5rem",padding:"0.25rem",background:"rgb(245,245,245)", borderLeft:"4px solid black",paddingLeft:"0.5rem",fontSize:"16px"}}>{props.message}</Typography>
        </>
    )
}