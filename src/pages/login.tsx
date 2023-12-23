import { Button, ConfigProvider, Form, Input, Typography, message } from "antd"
import '../styles/style.css'
import '../styles/utils.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


export default function Login(){

    const [posts, setPosts] = useState<any[]>([])
                useEffect(()=>{
                    fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+username)
                    .then(res => res.json())
                    .then(data => setPosts(data))
                })

    const [loading, setLoading] = useState(false)

    //Data
    const [username, usernameUpdate] = useState('')
    const [password, passwordUpdate] = useState('')

    // const [posts, setPosts] = useState<any[]>([])
    
    // let id = "2"
    const usenavigate = useNavigate()

        const Validate = () =>{
            if (username==""||password==""){
                message.info('Fields can not be empty');
            }
            else{        
                setLoading(true)
                setTimeout(() => {
                setLoading(false)

                

                
                posts.map((post)=>{
                    console.log(post.username)
                    if(post.username==username&&post.password==password){
                        console.log("Login successful")
                        usenavigate('/layout/home')
                    }
                    else{
                        console.log("Login failed")
                        message.info("Invalid credentials")
                    }
                })
                
                
                
        }, 1000);
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
                    

                    
                    <Form.Item>
                    <ConfigProvider
                        theme={{
                            token: {
                            colorPrimary:"black",
                            colorBorder:"#8a8a8a"
                            }
                        }}
                        >
                            <Form.Item name="username" rules={[{ required: true }]}>
                        <Input style={{fontSize:"16px"}} value={username} onChange={e=>usernameUpdate(e.target.value)} className="input_field" placeholder="Enter Username"></Input>
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true}]}> 
                        <Input.Password style={{fontSize:"16px"}} value={password} onChange={e=>passwordUpdate(e.target.value)} className="input_field" type="Password" placeholder="Enter Password"></Input.Password>
                    </Form.Item>

                    <div className="empty"></div>
                            
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