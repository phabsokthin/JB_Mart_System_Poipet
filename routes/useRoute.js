import express, { Router } from 'express';
import {register, login, logout} from '../controller/User.controller.js'
import { refresh } from '../token/refreshToken.js';
import { createSupplier, deleteSpplier, fetchSupplier, fetchSupplierByID, updateSupplier } from '../controller/Supplier.controller.js';
import { createCustomer, deleteCustomer, fetchCutomer, fetchCutomerByID, updateCustomer } from '../controller/Customer.controller.js';
import { createCategory, deleteCategory, fetchCategory, fetchCategoryByID, updateCategory } from '../controller/Category.controller.js';
import { createUnit, deleteUnit, fetchUnit, fetchUnitByID, updateUnit } from '../controller/Units.controller.js';
import { createBrand, deleteBrand, fetchBrand, fetchBrandByID, updateBrand } from '../controller/Brand.controller.js';
import { createProduct, deleteProduct, fetchProduct, fetchProductById, updateProduct } from '../controller/Product.controller.js';
import { createPurchases, deletePurchase, fetchPurchase, updatePurchase } from '../controller/Purchase.controller.js';
import { createBankType, deleteBankType, fetchBankType, updateBankType } from '../controller/BankType.controller.js';
import { createBank, deleteBank, fetchBank, updateBank, updateStatus, updateStatusEnabled } from '../controller/Bank.controller.js';
import { createBankTransfer, deleteBankTransfer, fetchBankTransfers } from '../controller/BankTransfer.controller.js';
import { createExpenseType, deleteExpenseType, fetchExpenseType, updateExpenseType } from '../controller/ExpenseType.controller.js';
import { createExpense, deleteExpense, fetchExpense, fetchExpenseById, updateExpense } from '../controller/Expense.controller.js';

const router = express.Router();

//register

router.get("/register", (req, res) =>{
    res.send("Hello")
})
router.post('/register', register )
router.post('/login', login)
router.delete('/logout', logout)

 
//totken 
router.get('/token', refresh)

//supplier
router.post('/supplier', createSupplier)
router.get("/supplier", fetchSupplier)
router.get("/supplier/:id", fetchSupplierByID)
router.delete("/supplier/:id", deleteSpplier)
router.put("/supplier/:id", updateSupplier)

//customer
router.get('/customer', fetchCutomer)
router.post('/customer', createCustomer)
router.get('/customer/:id', fetchCutomerByID)
router.delete('/customer/:id', deleteCustomer)
router.put('/customer/:id', updateCustomer)


//category



router.get('/category', fetchCategory)
router.post('/category', createCategory)
router.get('/category/:id', fetchCategoryByID)
router.delete('/category/:id', deleteCategory)
router.put('/category/:id', updateCategory)

// unit

router.get('/unit', fetchUnit)
router.post('/unit', createUnit)
router.get('/unit/:id', fetchUnitByID)
router.delete('/unit/:id', deleteUnit)
router.put('/unit/:id', updateUnit)

//brand

router.get('/brand', fetchBrand)
router.post('/brand', createBrand)
router.get('/brand/:id', fetchBrandByID)
router.delete('/brand/:id', deleteBrand)
router.put('/brand/:id', updateBrand)

//product 


router.get('/product', fetchProduct)
router.get('/product/:id', fetchProductById)
router.post('/product', createProduct)
router.delete('/product/:id', deleteProduct)
router.put('/product/:id', updateProduct)

//Purcahse 
router.post('/purchase', createPurchases)
router.get('/purchase', fetchPurchase)
router.put('/purchase', updatePurchase)
router.delete('/purchase', deletePurchase)

//bank type
router.get('/banktype', fetchBankType)
router.post('/banktype', createBankType)
router.put('/banktype/:id', updateBankType)
router.delete('/banktype/:id', deleteBankType)

//bank
router.post('/bank', createBank)
router.get('/bank', fetchBank)


router.put('/bank/:id', updateBank)
router.delete('/bank/:id', deleteBank)
router.put('/bankStatus/:id', updateStatus )
router.put('/bankStatusEnabled/:id', updateStatusEnabled)

//bank transfer
router.post('/banktransfer', createBankTransfer)
router.get('/banktransfer', fetchBankTransfers)
router.delete('/banktransfer/:id', deleteBankTransfer)

//Expense Type

router.post('/expenseType', createExpenseType)
router.get('/expenseType', fetchExpenseType)
router.put('/expenseType/:id', updateExpenseType)
router.delete('/expenseType/:id', deleteExpenseType)

//expense
router.post('/expense', createExpense)
router.get('/expense', fetchExpense)
router.get('/expense/:id', fetchExpenseById)
router.delete('/expense/:id', deleteExpense)
router.put('/expense/:id',updateExpense)


export default router;

