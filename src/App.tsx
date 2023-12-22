import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signup'
import Success from './pages/success'
import Layout from './pages/layout'
import Home from './pages/home'


export default function App() {


  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/layout/*' element={<Layout/>}>
        <Route path='home' element={<Home/>}/>
      </Route>
      <Route path='/home' element={<Home/>}/>
      
    </Routes>
    </BrowserRouter>
    </>
    
  )
}
