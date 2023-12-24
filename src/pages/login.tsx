import { Button, ConfigProvider, Form, Input, Typography, message } from "antd"
import '../styles/style.css'
import '../styles/utils.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"



export default function Login(){

    const [posts, setPosts] = useState<any[]>([])
    setTimeout(()=>{
        
    },1000)
    useEffect(()=>{
        setTimeout(()=>{
        fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+username)
        .then(res => res.json())
        .then(data => setPosts(data))
        },1000)
        
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
                        usenavigate('/layout/home/')
                    }
                    else{
                        console.log("Login failed")
                        message.info("Invalid credentials")
                    }
                })
                
                
                
        },50);
            }
        }
        
    
    return(
        <>
        
        <div className="fullpage_container">
            
                <div className="form_container">
                <div className="form_header">
                    <img alt="logo" style={{width:"2.75rem",height:"2.75rem"}} src="coffee-bag-color.png"></img>
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
                            
                            }
                        }}
                        >
                            <Form.Item name="username" rules={[{ required: true }]}>
                        <Input style={{fontSize:"14px"}} value={username} onChange={e=>usernameUpdate(e.target.value)} className="input_field" placeholder="Enter Username"></Input>
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true}]}> 
                        <Input.Password style={{fontSize:"14px"}} value={password} onChange={e=>passwordUpdate(e.target.value)} className="input_field" type="Password" placeholder="Enter Password"></Input.Password>
                    </Form.Item>

                    <div className="empty"></div>
                    
                            
                            <Button block type="primary" htmlType="submit" loading={loading} onClick={Validate} >LOGIN</Button>
                            
                            
                    </ConfigProvider>
                    </Form.Item>


                </Form>
                <Typography.Text style={{color:"#4a4a4a"}} className="form_text">Don't have an account?<Link style={{color:"black",fontWeight:600}} to="/signup" className="link" type="link">Sign-up</Link></Typography.Text>
                </div>
           
            
            
        </div>
        
        
        </>
    )
}