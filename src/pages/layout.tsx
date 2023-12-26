import ProLayout from "@ant-design/pro-layout";
import MenuItems from "../components/menuitems";
import { useState } from "react";
import Home from "./home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Likes from "./liked";
import Bookmarks from "./bookmarks";
import Posts from "./posts";
import Profile from "./profile";
import { Modal } from "antd";
import Chats from "./chat";



export default function Layout(){

  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState('/home');
  const usenavigate = useNavigate()
  
  const handleOk = () => {

    setOpen(false)
    usenavigate('/')

  };

  const handleCancel = () => {

    setOpen(false);

  };
    
    const Logout = () => {
      
        Modal.confirm({
          open:open,
          centered:true,
          title: 'Confirm Logout?',
          content: 'You are logging out of current session',
          onOk:handleOk,
          onCancel:handleCancel,
          okText:"Confirm",
          cancelText:"Cancel"  
        });
    }

    return(
        <>
        <ProLayout
        title="Coffee"
        logo="/coffee-black.png"
        fixedHeader={true}
        fixSiderbar={true}
        {...MenuItems}
        location={{pathname}}
        menuItemRender={(item, dom) => (
          <>
          <Link
              onClick={() => {
                setPathname(item.path || '/home');
              }}
              to={item.path||""}
            >
              {dom}
            </Link>
          </>
            
          )}
          
        menuFooterRender={(props) => {
            return (
              <a
                style={{
                  lineHeight: '48rpx',
                  display: 'flex',
                  height: 48,
                  color: 'black',
                  alignItems: 'center',
                }}
                
                onClick={Logout}
              >
                <img
                  alt="logo"
                  src="/logout.png"
                  style={{
                    width: 16,
                    height: 16,
                    margin: '0 16px',
                    marginInlineEnd: 10,
                  }}
                />
                {!props?.collapsed && 'LOGOUT'}
              </a>
            );
          }}
        >
          <Routes>
            <Route path="home" element={<Home/>}/>
            <Route path="likes" element={<Likes/>}/>
            <Route path="bookmarks" element={<Bookmarks/>}/>
            <Route path="posts" element={<Posts/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="chats" element={<Chats/>}/>
          </Routes>
            
        </ProLayout>
        
        </>
        
    )
}