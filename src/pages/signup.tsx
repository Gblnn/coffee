import { Button, ConfigProvider, Form, Input, Typography, message } from "antd"
import '../styles/style.css'
import '../styles/utils.css'
import { Link } from "react-router-dom"
import { useState } from "react"


export default function SignUp(){
    
    const [loading, setLoading] = useState(false)
    //Sign-in Data
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const Validate = () =>{
        if (fullname==""||email==""||id==""||password==""){
            message.info('Fields can not be empty');
        }
        else{
            SignUp()
            setLoading(true)
            setTimeout(() => {
            setLoading(false)
            window.location.replace("/success");
    }, 2000);
        }
        
    }

    const SignUp=()=>{
        
        let obj = {email, fullname, id, password}
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            window.location.replace("/success");
            fetch("http://localhost:3000/users",
            {
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(obj)
            }
            )
        }, 2000);
    }
    const toLogin=()=>{
        window.location.replace("/")
    }
    return(
        <>
        <div className="fullpage_container">
            <div className="form_container">
                <h1>SIGN-UP</h1>
                <Form
                style={{marginTop:"1.5rem"}}
                >
                    <Form.Item name="email" hasFeedback rules={[{ required:true, type:"email", message: 'Please enter a valid email' }]}>
                        <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input_field" placeholder="Email or phone number"></Input>
                    </Form.Item>
                    <Form.Item name="fullname" hasFeedback rules={[{ required: true, message: 'Please enter your fullname' }]}>
                        <Input value={fullname} onChange={e=>setFullname(e.target.value)} className="input_field" placeholder="Full Name"></Input>
                    </Form.Item>
                    <Form.Item hasFeedback rules={[{ required:true, message: 'Please enter a username' }]}>
                        <Input value={id} onChange={e=>setId(e.target.value)} className="input_field" placeholder="Username"></Input>
                    </Form.Item>
                    <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Please enter a password' }]}>
                        <Input.Password value={password} onChange={e=>setPassword(e.target.value)} className="input_field" type="Password" placeholder="Password"></Input.Password>
                    </Form.Item>
                </Form>
                <div className="empty"></div>
                <div className="form_footer">
                <ConfigProvider
                    theme={{
                        token: {
                        colorPrimary:"black"
                        }
                    }}
                    >
                        <Button loading={loading} block type="primary" onClick={Validate} htmlType="submit">Sign-up</Button>
                </ConfigProvider>
                
                <Typography.Text style={{color:"#9a9a9a", fontFamily:"Supreme"}} className="form_text">Already have an account?<Link style={{color:"black"}} to={{}} onClick={toLogin} className="link" type="link">Login</Link></Typography.Text>
                </div>
                
                        
                    
                
                
                
                
                
            </div>
        </div>
        </>
    )
}