import {HomeFilled, HeartFilled, BookFilled, EditFilled, UserOutlined} from '@ant-design/icons'

export default {
    route: {
      path: '/',
      routes: [
        {
          path: 'layout/home',
          name: 'Home',
          icon: <HomeFilled />,
          
          
        },
        {
          path: 'layout/likes',
          name: 'Likes',
          icon: <HeartFilled />,
          
          
        },
        {
            path: 'layout/bookmarks',
            name: 'Saved',
            icon: <BookFilled />,
            
            
        },
        {
            path: 'layout/posts',
            name: 'Posts (Not Ready)',
            icon: <EditFilled />,
            
            
        },
      //   {
      //     path: 'layout/chats',
      //     name: 'Chats (Not Ready)',
      //     icon: <CommentOutlined />,
          
          
          
      // },
        {
            path: 'layout/profile',
            name: 'Profile (Not Ready)',
            icon: <UserOutlined />,
            
            
            
        }
        
    ]
},
};

