import { Typography } from "antd";

interface Props {
    message:string
}

export default function ChatInput(props:Props){
    return(
        <>
        <Typography>{props.message}</Typography>
        </>
    )
}