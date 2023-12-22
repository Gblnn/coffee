import { PageHeader } from "@ant-design/pro-layout";
import { Empty } from "antd";


export default function Likes(){
    return(
        <>
        <PageHeader title="Liked Posts"/>
        <Empty style={{marginTop:"10rem"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No Liked Posts</span>}/>
        </>
    )
}