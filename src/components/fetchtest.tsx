import { Button, ConfigProvider } from "antd";

const onFetch = () =>{
    window.location.reload()
    fetch('https://6586a271468ef171392e80df.mockapi.io/posts?id')
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
        <ConfigProvider
            theme={{
                token: {
                        colorPrimary:"black"
                        }
                    }}
                    >
                        <Button type="primary" onClick={onFetch}>FETCH TEST</Button>
        </ConfigProvider>
        
        </>
    )
}