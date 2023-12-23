import { Button, ConfigProvider } from "antd";

const onFetch = () =>{
    window.location.reload()
    


                fetch('https://6586a271468ef171392e80df.mockapi.io/users?username=gbln', {
                    method: 'GET',
                    headers: {'content-type':'application/json'},
                  }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                  }).then(posts => {
                    console.log(posts)
                  })
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