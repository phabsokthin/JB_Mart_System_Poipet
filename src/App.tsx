import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import Signup from './views/Signup'
// import Sidebar from './views/Sidebar'
import Test from './views/Test'
import Dashboard from './views/Dashboard'
import PageNotFound from './views/PageNotFound'
import Product from './views/Product'
import Contact from './views/Contact'
import Purchase from './views/Purchase'
import POS from './views/POS'
import Supplier from './views/contact/Supplier'
import Customer from './views/contact/Customer'
import ContactInfo from './views/contact/ContactInfo'

function App() {

  return (
    <div className='bg-gray-100 min-h-screen overflow-x-auto min-w-max'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="test" element={<Test />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/supplier' element={<Supplier/>}/>
          <Route path='/customer' element={<Customer/>}/>
          <Route path='/contactInfo' element={<ContactInfo/>}/>

          <Route path='product' element={<Product/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/pos' element={<POS/>}/>

          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
