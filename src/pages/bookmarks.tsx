import { Empty } from "antd";



export default function Bookmarks(){
    return(
        <>
        <Empty style={{marginTop:"10rem"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No Bookmarks</span>}/>
        </>
    )
}