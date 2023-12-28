import { Button, Card, ConfigProvider, Drawer, Input, Typography, message } from "antd";
import { useEffect, useState } from "react";
import {EditFilled} from '@ant-design/icons'

export default function Profile(){

  const user_data = window.name
  const [user, setUser] =useState<any[]>([])
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false)

  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")

  const showDrawer = () => {
    setOpen(true);
    
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+user_data)
        .then(res => res.json())
        .then(data => {
            setUser(data)
            console.log(data)
        })
  },[])

  // const Reload = () => {
  //   message.loading("Updating")
  //   setLoading(true)
  //   setTimeout(()=>{
  //     setLoading(false)
  //     window.location.reload()
  //   },1000)
    
  // }

  const onPost = () => {
    fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+user_data, {
      method: 'PUT',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({fullname: fullname, username: username})
    })
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
    
    
  }


  return(
    <>
      {
      user.map((users)=>(
        <>
        <Card style={{borderRadius:"1rem", boxShadow:"1px 1px 20px rgb(200,200,200)"}} key={users.id} id={users.id}>
          <img src={users.profile}/>
          <h2>{users.fullname}</h2>
          
          <Typography style={{fontFamily:"Supreme", fontSize:"1rem"}}>@{users.username}</Typography>
          <a>{users.email}</a>
          <div style={{display:"flex", marginTop:"1.25rem", justifyContent:"flex-end"}}>
            <Button onClick={showDrawer}>Edit<EditFilled/></Button>
          </div>
          </Card>
        </>

        
        
      ))
      }
      <Drawer placement='bottom' size='default' title={"Edit Profile"} onClose={onClose} open={open}>
                    <ConfigProvider
                    theme={{
                        components: {
                        Input: {
                            hoverBorderColor:"black",
                            activeBorderColor:"#4a4a4a",
                            activeShadow:"#8a8a8a"
                        },
                        },
                    }}
                    >   
                    {/* <Tooltip title="Max limit is 6 characters" placement="topLeft" open={warn}>
                        <Input onChange={e=>setAuthor(e.target.value)} style={{fontWeight:700}} bordered={false} placeholder="How you'll appear"></Input>
                      </Tooltip> */}
                        
                        
                    
                    
                    
                    
                    <Input defaultValue={fullname} allowClear bordered={false} onChange={e=>setFullname(e.target.value)} style={{fontFamily:"Supreme", fontSize:"16px"}} maxLength={10} placeholder='Full Name'></Input>

                    <Input defaultValue={username} allowClear bordered={false} onChange={e=>setUsername(e.target.value)} style={{fontFamily:"Supreme", fontSize:"14px", fontWeight:"700"}} maxLength={10} placeholder='Username'></Input>
                    
                    
                    </ConfigProvider>
                    
                    <div className='empty' style={{marginTop:"0.75rem"}}></div>
                    <ConfigProvider
                        theme={{
                            token: {
                            colorPrimary:"black"
                            }
                        }}
                        >
                          <div style={{display:"flex", marginTop:"9rem",marginRight:"1rem", justifyContent:"flex-end"}}>
                          <Button style={{width:"6rem"}} type='primary' onClick={onPost} loading={loading}  >Update</Button>
                          </div>
                        
                        
                    </ConfigProvider>

                        
                </Drawer>
    
    </>
  )
}