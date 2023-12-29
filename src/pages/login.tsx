import { Button, ConfigProvider, Form, Input, Typography, message } from "antd"
import '../styles/style.css'
import '../styles/utils.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"



export default function Login(){

    const [posts, setPosts] = useState<any[]>([])
    const [postable, setPostable] = useState(false)
    
    let [username, usernameUpdate] = useState('')
    const [password, passwordUpdate] = useState('')

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
    })
        

    useEffect(()=>{
        setTimeout(()=>{ 
            fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+username)
        .then(res => res.json())
        .then(data => {
            setPosts(data) 
            console.log(data)
        })  
        },3000)
        
    },[password])
    
    

    const [loading, setLoading] = useState(false)

    //Data
    
    

    // const [posts, setPosts] = useState<any[]>([])
    
    // let id = "2"
    const usenavigate = useNavigate()

    // useEffect(()=>{
    //     setTimeout(()=>{
            
    //     },3000)
    // })

    useEffect(()=>{
    })

    window.name = username

    const Validate = () =>{

        
        

        username = username.toLowerCase()
        setLoading(true)


        setTimeout(() => {

            setLoading(false)
            posts.map((post)=>{
            console.log(post.username)
            if(post.username === username && post.password === password){
                console.log("Login successful")
                
                usenavigate('/layout/home/',{state:{id:1,user:posts}})
            }
            else{
                console.log("Login failed")
                message.info("Invalid credentials")
                }
            })
        },1000);
            
        }
        
    
    return(
        <>
        
        <div className="fullpage_container">
        <div style={{display:"flex",gap:"0.5rem",position:"absolute", top:0, left:0, padding:"1.5rem"}}>
            <img style={{width:"2rem"}} src="/coffee-black.png"></img>
            <h2 style={{fontWeight:900,color:"rgba(0,0,0,0.45)", fontSize:"1.5rem"}}>COFFEE</h2>
        </div>
                <div className="form_container">
                <div className="form_header">
                    <img alt="logo" style={{width:"2.75rem",height:"2.75rem"}} src="coffee-bag.png"></img>
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
                            token:{
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
                        
                        <Button disabled={!postable} block type="primary" htmlType="submit" loading={loading} onClick={Validate} >LOGIN</Button>
                                   
                    </ConfigProvider>
                    </Form.Item>
                </Form>
                <Typography.Text style={{color:"#4a4a4a"}} className="form_text">Don't have an account?<Link style={{color:"black",fontWeight:600}} to="/signup" className="link" type="link">Sign-up</Link></Typography.Text>
                </div>
           
            
            
        </div>
        
        
        </>
    )
}