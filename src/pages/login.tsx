import { Button, ConfigProvider, Form, Input, Typography, message } from "antd"
import '../styles/style.css'
import '../styles/utils.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ProCard } from "@ant-design/pro-components"


export default function Login(){

    //Declaring Variables
    const [loading, setLoading] = useState(false)
    const usenavigate = useNavigate()

    const [posts, setPosts] = useState<any[]>([])
    const [postable, setPostable] = useState(false)
    
    const [username, usernameUpdate] = useState('')
    const [password, passwordUpdate] = useState('')

    // Validation
    useEffect(()=>{
        if(username==""){
            setPostable(false)
        }
        else{
            setPostable(true)
        }
        if(password==""){
            setPostable(false)
        }
        else{
            setPostable(true)
        }
    },[username, password])
        

    //Fetching Login Details from MockAPI
    useEffect(()=>{
        setTimeout(()=>{ 
            fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+username)
        .then(res => res.json())
        .then(data => {
            setPosts(data) 
            console.log(data)
        })  
        },3000)
        
    },[username, password])

    window.name = username

    const Validate = () =>{

        usernameUpdate(username.toLowerCase())
        setLoading(true)

        setTimeout(() => {

            setLoading(false)
            posts.map((post)=>{
           
                if(post.username === username && post.password === password){
                    message.success("Logged In")
                    usenavigate('/layout/home/',{state:{id:1,user:posts}})
                }
                else{
                    message.info("Invalid credentials")
                }
            })

        },1000);
            
    }
        
    
    return(
        <>
        <div className="fullpage-container">

            <div style={{display:"flex",gap:"0.5rem",position:"absolute", top:0, left:0, padding:"2rem"}}>
                <img style={{width:"2rem"}} src="/coffee-black.png"></img>
                <h2 style={{fontWeight:900,color:"#8a8a8a", fontSize:"1.5rem"}}>COFFEE</h2>
            </div>

            <ProCard style={{width:"38ch", padding:"0.5rem"}} className="form-container">
                <div className="form-header">
                    <img alt="logo" style={{width:"2.75rem",height:"2.75rem"}} src="coffee-bag-color.png"></img>
                    <h1>LOGIN</h1>
                </div>
                <div className="empty"></div>
                    
                <Form name="basic" style={{marginTop:"1.5rem", width:"100%"}}>  
                    <Form.Item>
                        <ConfigProvider theme={{token:{colorPrimary:"salmon"}}}>
                            <Form.Item name="username" rules={[{ required: true }]}>
                                <Input style={{fontSize:"14px"}} value={username} onChange={e=>usernameUpdate(e.target.value)} className="input-field" placeholder="Enter Username"></Input>
                            </Form.Item>

                            <Form.Item name="password" rules={[{ required: true}]}> 
                                <Input.Password style={{fontSize:"14px"}} value={password} onChange={e=>passwordUpdate(e.target.value)} className="input-field" type="Password" placeholder="Enter Password"></Input.Password>
                            </Form.Item>

                            <div className="empty"></div>
                                
                            <Button disabled={!postable} block type="primary" htmlType="submit" loading={loading} onClick={Validate} >LOGIN</Button>
                                        
                        </ConfigProvider>
                    </Form.Item>
                </Form>

                <Typography.Text style={{color:"#4a4a4a",width:"100%", textAlign:"center", fontFamily:"Supreme"}} className="form-text">Don't have an account?<Link style={{color:"#8a8a8a",fontWeight:600}} to="/signup" className="link" type="link">Sign-up</Link></Typography.Text>
                
            </ProCard>
        </div>
 
        </>
    )
}