import ProLayout from "@ant-design/pro-layout";
import MenuItems from "../components/menuitems";
import { useState } from "react";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Likes from "./liked";
import Bookmarks from "./bookmarks";
import Posts from "./posts";
import Profile from "./profile";
import { Modal } from "antd";



export default function Layout(){
    
    const Logout = () => {
      
        Modal.confirm({
          centered:true,
          title: 'Confirm Logout?',
          content: 'You are logging out of current session',
          
          onOk(){
            window.location.replace("/")
          },

          onCancel(){

          }
          
          
        });
      

    }
    const [pathname, setPathname] = useState('/home');
    return(
        <>
        
        <ProLayout
        title="Coffee"
        logo="/coffee-black.png"
        
        {...MenuItems}
        location={{pathname}}
        menuItemRender={(item, dom) => (
          <>
          
          <a

              onClick={() => {
                setPathname(item.path || '/home');
                
              }}
              href={item.path}
            >
              {dom}
            </a>
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
          </Routes>
            
        </ProLayout>
        
        </>
        
    )
}