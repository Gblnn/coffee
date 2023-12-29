import { Button, ConfigProvider, Form, Input, Tooltip, Typography, message } from "antd"
import '../styles/style.css'
import '../styles/utils.css'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


export default function SignUp(){
    
    const [loading, setLoading] = useState(false)
    //Sign-in Data
    const [fullname, setFullname] = useState("")
    const profile = "/coffee.png"
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const usenavigate = useNavigate()
    const obj = {profile, email, fullname, username, password}
    window.name = username
    const [postable, setPostable] = useState(false)
    const [warn, setWarn] = useState(false)
    const [passwarn, setPassWarn] = useState(false)
    


    useEffect(()=>{
        if(fullname==""){
            setPostable(false)
        }
        else{
            setPostable(true)
        }
        if(email==""){
            setPostable(false)
        }
        else{
            setPostable(true)
        }
        if(username==""){
            setPostable(false)
        }
        if(username.length>8){
            setPostable(false)
            setWarn(true)
        }
        else{
            setWarn(false)
        }

        if(password==""){
            setPostable(false)
        }
        

        
        if(password.length>1){  
            setPassWarn(true)
        }
        if(password.length>7){
            setPassWarn(false)
        }
        if(password.length<8){
            setPostable(false)
        }
        
    },[fullname, email, username, password])

    const SignUp=()=>{
        
        
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            fetch("https://6586a271468ef171392e80df.mockapi.io/users",
            {
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(obj)
            }
            )
        }, 1000);
    }

    const Validate = () =>{
        if (fullname==""||email==""||username==""||password==""){
            message.info('Fields can not be empty');
        }
        else{
            SignUp()
            setLoading(true)
            setTimeout(() => {
            setLoading(false)
            usenavigate('/layout/home/')
    }, 2000);
        }
        
    }

    
    return(
        <>
        <div className="fullpage_container">
            <div className="form_container">
                <h1>SIGN-UP</h1>
                
                {/* <div className="empty"></div> */}
                <div className="form_footer">
                <ConfigProvider
                    theme={{
                        token: {
                        colorPrimary:"black"
                        }
                    }}
                    >
                        <Form
                style={{marginTop:"1.5rem"}}
                >
                    <Form.Item name="email" hasFeedback rules={[{ required:true, type:"email", message: 'Please enter a valid email' }]}>
                        <Input style={{fontSize:"14px"}} type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input_field" placeholder="Email or phone number"></Input>
                    </Form.Item>
                    <Form.Item name="fullname" hasFeedback rules={[{ min:3, required: true, message: 'Please enter your fullname' }]}>
                        
                        <Input style={{fontSize:"14px"}} value={fullname} onChange={e=>setFullname(e.target.value)} className="input_field" placeholder="Full Name"></Input>
                    </Form.Item>
                    <Form.Item name="username" hasFeedback rules={[{ min:4, required:true, message: 'Please enter a username' }]}>
                        <Tooltip title="Max limit is 8 characters" placement="topRight" open={warn}>
                        <Input style={{fontSize:"14px"}} value={username} onChange={e=>setUsername(e.target.value)} className="input_field" placeholder="Username"></Input>
                        </Tooltip>
                        
                    </Form.Item>
                    <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Please enter a password', min:6 }]}>
                        <Tooltip title="Use atleast 8 characters" placement="topRight" open={passwarn}>
                        <Input.Password style={{fontSize:"14px"}} value={password} onChange={e=>setPassword(e.target.value)} className="input_field" type="Password" placeholder="Password"></Input.Password>
                        </Tooltip>
                        
                    </Form.Item>
                </Form>
                        <Button disabled={!postable} loading={loading} block type="primary" onClick={Validate} htmlType="submit">Sign-up</Button>
                </ConfigProvider>
                
                <Typography.Text style={{color:"#4a4a4a"}} className="form_text">Already have an account?<Link style={{color:"black",fontWeight:600, fontFamily:"Supreme"}} to="/" className="link" type="link">Login</Link></Typography.Text>
                </div>
                
                        
                    
                
                
                
                
                
            </div>
        </div>
        </>
    )
}