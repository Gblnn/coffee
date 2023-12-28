import { Button, Card, ConfigProvider, Drawer, Input, Modal, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined ,EditFilled, LoadingOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";



export default function Profile(){

  const usenavigate = useNavigate()

  const user_data = window.name
  const [user, setUser] = useState<any[]>([])
  const [open, setOpen] = useState(false);
  // const [posts, setPosts] = useState<any[]>([])
  const [postid, setPostid] = useState("")
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
    setTimeout(()=>{
      // fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+user_data)
      // .then(res => res.json())
      // .then(data => setUser(data))

      fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+user_data, {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
      if (res.ok) {
      return res.json();
      }
  
    }).then(posts => {
      setUser(posts)
      console.log(user)
    })
    
      user.map((post)=>(setPostid(post.id)))
      console.log(user)
      console.log(postid)
    },3000)
    
  })

  // const Reload = () => {
  //   message.loading("Updating")
  //   setLoading(true)
  //   setTimeout(()=>{
  //     setLoading(false)
  //     window.location.reload()
  //   },1000)
    
  // }

  const onPost = () => {
    message.loading("Updating")
    // fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+user_data)
    //     .then(res => res.json())
    //     .then(data => {
    //       setPosts(data)
    //       console.log(posts)
    //     } )

        
        user.map((post)=>(
        setPostid(post.id)
        ))
      setLoading(true)
      setTimeout(()=>{
        console.log(postid)
        fetch("https://6586a271468ef171392e80df.mockapi.io/users/"+postid, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({fullname: fullname, username: username})
        })
      setLoading(false)
      setOpen(false)
      Login()
      
      },1000)
    
    
    
  }

  const Login = () =>{
    setTimeout(()=>{
      usenavigate("/")
      message.info("Username updated. Login to continue.")
      
    },1000)
  }

  const confirmDelete = () => {
    Modal.confirm({
      centered:true,
      title:"Delete Account?",
      content:"This action can not be undone",
      okText:"Delete",
      cancelText:"Cancel",
      onOk:handleDelete,
      okButtonProps:{style:{background:"black"}},
      cancelButtonProps:{style:{borderColor:"rgb(175,175,175)", color:"black"}}
    })
  }

  const handleDelete = () => {
    message.loading("Deleting account")
    // fetch("https://6586a271468ef171392e80df.mockapi.io/users?username="+user_data)
    //     .then(res => res.json())
    //     .then(data => {
    //         setPosts(data) 
    //         console.log(data)
    //       })

    // posts.map((post)=>{
    //   setPostid(post.id)
    //   console.log(postid)
    // })
    user.map((post)=>(
      setPostid(post.id)
      ))
    setTimeout(()=>{
      console.log(postid)
      fetch("https://6586a271468ef171392e80df.mockapi.io/users/"+postid, {
      method: 'DELETE',
      })

      setTimeout(()=>{
      Redirect()
      },1000)

    },2000)
     
    

    
  }

  const Redirect = () => {
    usenavigate("/")
    message.info("Account removed")
  }


  return(
    <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
      <LoadingOutlined style={{position:"fixed",marginTop:"5rem", fontSize:"2rem"}}/>
      {
      user.map((users)=>(

        <Card key={users.id} style={{height:"15rem",width:"100%",marginBottom:"1rem",borderRadius:"1rem", boxShadow:"1px 1px 20px rgb(200,200,200)"}} >
          <img src={users.profile}/>
          <h2>{users.fullname}</h2>
          
          <Typography style={{fontFamily:"Supreme", fontSize:"1rem"}}>@{users.username}</Typography>
          <a>{users.email}</a>
          <div style={{display:"flex", marginTop:"1.5rem", justifyContent:"space-between", gap:"0.5rem"}}>
            <Button onClick={showDrawer}>Edit<EditFilled/></Button>
            <Button onClick={confirmDelete}><DeleteOutlined/>Delete Account</Button>
            
          </div>
        </Card>
        

        
        
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
    
    </div>
  )
}