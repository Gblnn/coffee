import {HomeFilled, HeartFilled, BookFilled, EditFilled, UserOutlined, CommentOutlined} from '@ant-design/icons'

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
            name: 'Bookmarks',
            icon: <BookFilled />,
            
            
        },
        {
            path: 'layout/posts',
            name: 'Posts',
            icon: <EditFilled />,
            
            
        },
        {
            path: 'layout/profile',
            name: 'Profile',
            icon: <UserOutlined />,
            
            
            
        },
    ]
},
};

