import { Button, ConfigProvider, Form, Input, Typography, message } from "antd"
import '../styles/style.css'
import '../styles/utils.css'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"


export default function Login(){
    const [loading, setLoading] = useState(false)

    //Data
    const [username, usernameUpdate] = useState('')
    const [password, passwordUpdate] = useState('')

    const usenavigate = useNavigate()

        const Validate = () =>{
            if (username==""||password==""){
                // setEmpty(true)
                message.info('Fields can not be empty');
            }
            else{
                // fetch("https://6586a271468ef171392e80df.mockapi.io/users" + username).then((res)=>{return res.json}).then((resp)=>{
                //     if (resp.password == username){

                //     }
                //     else{
                //         message.info('Invalid credentials');
                //     }
                // })

                fetch('https://6586a271468ef171392e80df.mockapi.io/users')
                .then(data => {
                    return data.json();
                })
                    .then(res => {
                    console.log(res);
                    console.log(res.password);
                });
                
                setLoading(true)
                setTimeout(() => {
                setLoading(false)
                usenavigate('/layout/home')
                
        }, 2000);
            }
        }
        
    
    return(
        <>
        <div className="fullpage_container">
            <div className="form_container">
                <div className="form_header">
                    <img src="coffee.png"></img>
                    <h1>LOGIN</h1>
                </div>
                
                <div className="empty"></div>
                <Form
                name="basic"
                style={{marginTop:"1.5rem"}}
                
                >
                    

                    <Form.Item name="username" rules={[{ required: true }]}>
                        <Input value={username} onChange={e=>usernameUpdate(e.target.value)} className="input_field" placeholder="Enter Username"></Input>
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true}]}> 
                        <Input.Password value={password} onChange={e=>passwordUpdate(e.target.value)} className="input_field" type="Password" placeholder="Enter Password"></Input.Password>
                    </Form.Item>

                    <div className="empty"></div>
                    <Form.Item>
                    <ConfigProvider
                        theme={{
                            token: {
                            colorPrimary:"black"
                            }
                        }}
                        >
                            
                            <Button block type="primary" htmlType="submit" loading={loading} onClick={Validate} >LOGIN</Button>
                            
                            
                    </ConfigProvider>
                    </Form.Item>


                </Form>
                
                
                
                
                
                <Typography.Text style={{color:"#9a9a9a"}} className="form_text">Don't have an account?<Link style={{color:"black"}} to="/signup" className="link" type="link">Sign-up</Link></Typography.Text>
            </div>
        </div>
        
        
        </>
    )
}