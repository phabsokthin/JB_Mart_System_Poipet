import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Test from "./views/Test";
import Dashboard from "./views/Dashboard";
import PageNotFound from "./views/PageNotFound";

import Contact from "./views/Contact";
import Purchase from "./views/purchase/Purchase";
import POS from "./views/POS";
import Supplier from "./views/contact/Supplier";
import Customer from "./views/contact/Customer";
import ContactInfo from "./views/contact/ContactInfo";
import Product from "./views/product/Product";
import ProductUnit from "./views/product/ProductUnit";
import Category from "./views/product/Category";
import Brands from "./views/product/Brands";
import Warranty from "./views/product/Warranty";
import Expense from "./views/expense/Expense";
import Expense_Type from "./views/expense/Expense_Type";
import CreatePurchase from "./views/purchase/CreatePurchase";
import PurchaseReturn from "./views/purchase/PurchaseReturn";
import Topup from "./views/topup/Topup";
import TopupType from "./views/topup/TopupType";
import CreateTopUp from "./views/topup/CreateTopUp";
import CreateProduct from "./views/product/CreateProduct";

function App() {
  return (
    <div className="min-h-screen overflow-x-auto bg-gray-100 min-w-max">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Customer */}

          <Route path="/supplier" element={<Supplier />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/contactInfo" element={<ContactInfo />} />

          {/* Product Route */}
          <Route path="/product" element={<Product />} />
          <Route path="/createProduct" element={<CreateProduct/>}/>
          <Route path="/productUnit" element={<ProductUnit />} />
          <Route path="/category" element={<Category />} />
      
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="*" element={<PageNotFound />} />

           {/* Purchase Route */}
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/createPurchase" element={<CreatePurchase />} />
          <Route path="/puchaseReturn" element={<PurchaseReturn/>}/>


          {/* top up */}

          <Route path="/topup" element={<Topup/>}/>
          <Route path="/createTopup" element={<CreateTopUp/>}/>
          <Route path="/topuType" element={<TopupType/>}/> 
          
          {/* Expense Route */}
          <Route path="/expense" element={<Expense />} />
          <Route path="/expense_type" element={<Expense_Type />} />

          
         
      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
