import { Button } from "antd";


const onFetch = () =>{
    fetch('https://6586a271468ef171392e80df.mockapi.io/posts?id=1')
                .then(data => {
                    return data.json();
                })
                    .then(res => {
                    console.log(res);
                });
}

export default function FetchTest(){
    return(
        <>
        <Button type="primary" onClick={onFetch}>FETCH TEST</Button>
        </>
    )
}