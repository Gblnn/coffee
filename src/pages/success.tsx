import { Button, ConfigProvider, Result } from "antd";


export default function Success(){

    const toHome=()=>{
        window.location.replace("/layout/home")
    }
    return(
        <>
        <div className="fullpage_container">
        <Result
        status={"success"}
        title="Account Created Successfully"
        subTitle="Click the button below to continue"
        extra={[
            <ConfigProvider
                    theme={{
                        token: {
                        colorPrimary:"black"
                        }
                    }}
                    ><Button onClick={toHome} type="primary">Continue</Button></ConfigProvider>
            
        ]}
        ></Result>
        </div>
        
        </>
    )
}