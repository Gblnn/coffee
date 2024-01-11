
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, theme } from 'antd'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
        <App/>
    </ConfigProvider>
    

  
  
)
