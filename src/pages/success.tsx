import { Button, ConfigProvider, Result } from "antd";
import { useNavigate } from "react-router-dom";


export default function Success(){

    const usenavigate = useNavigate()
    const toHome=()=>{
        usenavigate("/layout/home")
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