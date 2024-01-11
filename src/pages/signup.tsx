import { Button, ConfigProvider, Form, Input, Tooltip, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import '../styles/style.css'
import '../styles/utils.css'


export default function SignUp(){

    const usenavigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [fullname, setFullname] = useState("")
    const profile = "/coffee.png"
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const obj = {profile, email, fullname, username, password}
    
    const [postable, setPostable] = useState(false)
    const [warn, setWarn] = useState(false)
    const [passwarn, setPassWarn] = useState(false)
    
    window.name = username

    //Validation Rules
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

        //Posting data to MockAPI
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

    //Checking for empty fields
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

        <div className="fullpage-container">

            <div className="form-container">

                <h1>SIGN-UP</h1>
                <Form style={{marginTop:"1.5rem", width:"100%"}}>

                <ConfigProvider theme={{token: {colorPrimary:"black"}}}>
                    {/* Email Field */}
                    <Form.Item name="email" hasFeedback rules={[{ required:true, type:"email", message: 'Please enter a valid email' }]}>
                        <Input style={{fontSize:"14px"}} type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input-field" placeholder="Email or phone number"></Input>
                    </Form.Item>

                    {/* Fullname Field */}
                    <Form.Item name="fullname" hasFeedback rules={[{ min:3, required: true, message: 'Please enter your fullname' }]}>
                        <Input style={{fontSize:"14px"}} value={fullname} onChange={e=>setFullname(e.target.value)} className="input-field" placeholder="Full Name"></Input>
                    </Form.Item>

                    {/* Username Field */}
                    <Form.Item name="username" hasFeedback rules={[{ min:4, required:true, message: 'Please enter a username' }]}>
                        <Tooltip title="Max limit is 8 characters" placement="topRight" open={warn}>
                            <Input style={{fontSize:"14px"}} value={username} onChange={e=>setUsername(e.target.value)} className="input-field" placeholder="Username"></Input>
                        </Tooltip>
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Please enter a password', min:6 }]}>
                        <Tooltip title="Use atleast 8 characters" placement="topRight" open={passwarn}>
                            <Input.Password style={{fontSize:"14px"}} value={password} onChange={e=>setPassword(e.target.value)} className="input-field" type="Password" placeholder="Password"></Input.Password>
                        </Tooltip>
                    </Form.Item>


                    <div className="empty"></div>


                    
                        <Button disabled={!postable} loading={loading} block type="primary" onClick={Validate} htmlType="submit">Sign-up</Button>
                    </ConfigProvider>


                </Form>
                
                {/* Form Footer */}
                <div className="form-footer" style={{width:"100%", marginTop:"1.5rem"}}>
                <Typography.Text style={{color:"#4a4a4a", fontFamily:"Supreme"}} className="form-text">Already have an account?<Link style={{color:"#8a8a8a",fontWeight:600, fontFamily:"Supreme"}} to="/" className="link" type="link">Login</Link></Typography.Text>
                </div>
                
            </div>
        </div>
        </>
    )
}