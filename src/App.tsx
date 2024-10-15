
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import Signup from './views/Signup'
// import Sidebar from './views/Sidebar'
import Test from './views/Test'
import Dashboard from './views/Dashboard'
import PageNotFound from './views/PageNotFound'
import Product from './views/Product'

function App() {

  return (
    <div className='bg-gray-100 h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="test" element={<Test />} />
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='product' element={<Product/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
